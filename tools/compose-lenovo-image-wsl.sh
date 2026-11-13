#!/usr/bin/env bash
# Compone l'immagine system Albori per Lenovo Tab M8 HD (TB-8505F) partendo
# dall'ubuntu.img verificato del port e sovrapponendo shell e Impostazioni
# compilate per arm64 con prefisso /usr (ALBORI_SYSTEM_IMAGE=ON).
#
# Correzione 2026-11-12: la versione precedente copiava uno stage compilato
# con prefisso "." (percorsi /./share/lomiri, /./lib/lomiri/qml): sul tablet
# la shell non trovava i propri QML e il boot restava fermo sul logo.
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
    echo "Esegui come root: sudo bash $0" >&2
    exit 1
fi

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
original="$project_root/device-ports/lenovo-tab-m8/verified-artifacts-job-16064434001/out/ubuntu.img"
output_dir="$project_root/build/arm64/images"
output="$output_dir/albori-os-tb8505f-prealpha.img"
shell_stage="$project_root/sources/lomiri/.clickable/arm64/stage"
settings_stage="$project_root/sources/lomiri-system-settings/.clickable/arm64/stage"
schemas_source="$project_root/sources/lomiri-schemas"
device_overlay="$project_root/config/tb8505f-overlay"
mount_dir=$(mktemp -d /tmp/albori-image.XXXXXX)

cleanup() {
    if mountpoint -q "$mount_dir"; then
        umount "$mount_dir"
    fi
    rmdir "$mount_dir" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

fail() { echo "ERRORE: $*" >&2; exit 1; }

# --- Controlli preliminari sugli stage ------------------------------------
test -f "$original" || fail "manca l'immagine base $original"
test -f "$schemas_source/CMakeLists.txt" || fail "manca $schemas_source"

test -x "$shell_stage/usr/bin/lomiri" \
    || fail "shell non compilata con layout /usr: esegui bash tools/build-shell-arm64-wsl.sh"
test -x "$settings_stage/usr/bin/lomiri-system-settings" \
    || fail "Impostazioni non compilate con layout /usr: esegui bash tools/build-settings-arm64-wsl.sh"

binary_strings() {
    { strings -n 5 "$1"; strings -n 5 -e l "$1"; } 2>/dev/null || true
}
check_prefix() {
    local bin=$1 marker=$2 text
    text=$(binary_strings "$bin")
    if grep -E '^/\./' <<<"$text" >/dev/null; then
        fail "$bin contiene percorsi con prefisso '.' (/./...): ricompila con ALBORI_SYSTEM_IMAGE=ON"
    fi
    grep -F "$marker" <<<"$text" >/dev/null \
        || fail "$bin non contiene il percorso atteso $marker"
}
check_prefix "$shell_stage/usr/bin/lomiri" "/usr/share/lomiri/"
check_prefix "$settings_stage/usr/bin/lomiri-system-settings" "/usr/share/lomiri-system-settings"
test -f "$shell_stage/usr/share/lomiri/Shell.qml" || fail "manca Shell.qml nello stage della shell"

# --- Composizione ------------------------------------------------------------
mkdir -p "$output_dir"
rm -f "$output"
cp --reflink=auto --sparse=always "$original" "$output"

e2fsck -fn "$output"
mount -o loop,rw "$output" "$mount_dir"

overlay_stage() {
    local stage=$1
    rsync -aH \
        --exclude 'include/' \
        --exclude 'lib/*/cmake/' --exclude 'lib/*/pkgconfig/' \
        --exclude 'lib/cmake/' --exclude 'lib/pkgconfig/' \
        --exclude 'share/doc/' \
        "$stage/usr/" "$mount_dir/usr/"
    if [ -d "$stage/etc" ]; then
        rsync -aH "$stage/etc/" "$mount_dir/etc/"
    fi
}
overlay_stage "$shell_stage"
overlay_stage "$settings_stage"

# Device fixes for the TB-8505F (PowerVR text rendering).
if [ -d "$device_overlay" ]; then
    rsync -rlt --chown=0:0 --chmod=D0755,F0644 "$device_overlay/" "$mount_dir/"
fi

for schema in "$schemas_source"/data/schemas/*.gschema.xml.in; do
    install -m 0644 "$schema" \
        "$mount_dir/usr/share/glib-2.0/schemas/$(basename "${schema%.in}")"
done
install -m 0644 "$schemas_source"/data/accountsservice/*.xml \
    "$mount_dir/usr/share/dbus-1/interfaces/"
install -m 0644 "$schemas_source"/data/accountsservice/com.lomiri.AccountsService.policy \
    "$mount_dir/usr/share/polkit-1/actions/"
install -m 0644 "$schemas_source"/data/accountsservice/50-com.lomiri.AccountsService.rules \
    "$mount_dir/usr/share/polkit-1/rules.d/"
mkdir -p "$mount_dir/usr/share/accountsservice/interfaces"
for interface in "$schemas_source"/data/accountsservice/*.xml; do
    name=$(basename "$interface")
    ln -sfn "../../dbus-1/interfaces/$name" \
        "$mount_dir/usr/share/accountsservice/interfaces/$name"
done
glib-compile-schemas "$mount_dir/usr/share/glib-2.0/schemas"
rm -f "$mount_dir/usr/share/lomiri-system-settings/qml-plugins/about/fakepkgslist.xml"

chown -R 0:0 \
    "$mount_dir/usr/share/lomiri" \
    "$mount_dir/usr/share/lomiri-system-settings" \
    "$mount_dir/usr/lib/aarch64-linux-gnu/lomiri" \
    "$mount_dir/usr/lib/aarch64-linux-gnu/lomiri-system-settings"
chown 0:0 "$mount_dir/usr/bin/lomiri" "$mount_dir/usr/bin/lomiri-system-settings"

# --- Controlli sull'immagine composta ---------------------------------------
for path in \
    /usr/bin/lomiri \
    /usr/share/lomiri/Shell.qml \
    /usr/lib/aarch64-linux-gnu/liblomiri-private.so.0 \
    /usr/lib/aarch64-linux-gnu/lomiri/qml \
    /usr/bin/lomiri-system-settings \
    /usr/share/lomiri-system-settings \
    /usr/libexec/lomiri-systemd-wrapper; do
    test -e "$mount_dir$path" || fail "manca $path nell'immagine composta"
done
if [ -n "$(find "$mount_dir/usr/lib/aarch64-linux-gnu" -maxdepth 2 -xtype l -name '*lomiri*' -print -quit)" ]; then
    fail "link simbolici lomiri rotti nell'immagine"
fi

sync
umount "$mount_dir"
e2fsck -fy "$output" || [ $? -le 1 ]
sha256sum "$original" "$output"
dumpe2fs -h "$output" 2>/dev/null | grep -E 'Filesystem state:|Block count:|Free blocks:|Block size:'
echo "OK: immagine pronta in $output"
