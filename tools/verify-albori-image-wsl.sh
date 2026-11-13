#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
    echo "Esegui come root: sudo bash $0" >&2
    exit 1
fi

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
image="$project_root/build/arm64/images/albori-os-tb8505f-prealpha.img"
shell_stage="$project_root/sources/lomiri/.clickable/arm64/stage"
settings_stage="$project_root/sources/lomiri-system-settings/.clickable/arm64/stage"
mount_dir=$(mktemp -d /tmp/albori-verify.XXXXXX)

cleanup() {
    if mountpoint -q "$mount_dir"; then
        umount "$mount_dir"
    fi
    rmdir "$mount_dir" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

e2fsck -fn "$image"
mount -o loop,ro "$image" "$mount_dir"

cmp "$shell_stage/usr/bin/lomiri" "$mount_dir/usr/bin/lomiri"
cmp "$settings_stage/usr/bin/lomiri-system-settings" "$mount_dir/usr/bin/lomiri-system-settings"
for bin in "$mount_dir/usr/bin/lomiri" "$mount_dir/usr/bin/lomiri-system-settings"; do
    text=$({ strings -n 5 "$bin"; strings -n 5 -e l "$bin"; } 2>/dev/null || true)
    if grep -E '^/\./' <<<"$text" >/dev/null; then
        echo "ERRORE: $bin usa percorsi /./ (prefisso errato)" >&2
        exit 1
    fi
done
test -s "$mount_dir/usr/share/glib-2.0/schemas/gschemas.compiled"
test -f "$mount_dir/usr/share/glib-2.0/schemas/com.lomiri.Shell.gschema.xml"
test -f "$mount_dir/usr/share/lomiri/Shell.qml"
test -f "$mount_dir/usr/share/lomiri/Launcher/Launcher.qml"
test -f "$mount_dir/usr/share/lomiri/Stage/Stage.qml"
test -d "$mount_dir/usr/lib/aarch64-linux-gnu/lomiri/qml"
test -z "$(find "$mount_dir/usr/share/lomiri-system-settings" -iname '*fake*' -print -quit)"

file "$mount_dir/usr/bin/lomiri" "$mount_dir/usr/bin/lomiri-system-settings"
sha256sum "$mount_dir/usr/bin/lomiri" "$mount_dir/usr/bin/lomiri-system-settings" "$image"
df -h "$mount_dir"
echo "OK: verifica superata"
