#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
    echo "Run this script as root." >&2
    exit 1
fi

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
image="$project_root/build/arm64/images/albori-os-tb8505f-prealpha.img"
mount_dir=$(mktemp -d /tmp/albori-diagnose.XXXXXX)

cleanup() {
    if mountpoint -q "$mount_dir"; then
        umount "$mount_dir"
    fi
    rmdir "$mount_dir" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

mount -o loop,ro "$image" "$mount_dir"

echo '=== Package versions in base image ==='
chroot "$mount_dir" dpkg-query -W \
    lomiri lomiri-system-settings lomiri-schemas \
    liblomiri-api0 liblomiri-shell-api0 \
    qtmir libqt5mir1server 2>&1 || true

echo '=== Main ELF dependencies ==='
readelf -d "$mount_dir/usr/bin/lomiri" | grep -E 'NEEDED|RPATH|RUNPATH' || true
readelf -d "$mount_dir/usr/bin/lomiri-system-settings" | grep -E 'NEEDED|RPATH|RUNPATH' || true

echo '=== Runtime linker resolution ==='
chroot "$mount_dir" /usr/bin/ldd /usr/bin/lomiri 2>&1 || true
chroot "$mount_dir" /usr/bin/ldd /usr/bin/lomiri-system-settings 2>&1 || true

echo '=== Loader smoke tests ==='
chroot "$mount_dir" /usr/bin/env QT_QPA_PLATFORM=offscreen \
    timeout 10 /usr/bin/lomiri --help 2>&1 || true
chroot "$mount_dir" /usr/bin/env QT_QPA_PLATFORM=offscreen \
    timeout 10 /usr/bin/lomiri-system-settings --help 2>&1 || true

echo '=== Installed library locations ==='
find "$mount_dir/usr/lib" -maxdepth 5 \
    \( -name 'liblomiri-private.so*' \
    -o -name 'libLomiriSystemSettings.so*' \
    -o -name 'libLomiriSystemSettingsPrivate.so*' \) \
    -printf '%p -> %l\n' | sort

echo '=== Broken symlinks in overlaid library trees ==='
find "$mount_dir/usr/lib/aarch64-linux-gnu" -xtype l \
    \( -path '*lomiri*' -o -path '*Lomiri*' \) -print | head -n 100

echo '=== Lomiri service command ==='
grep -R "ExecStart=.*lomiri" \
    "$mount_dir/usr/lib/systemd" "$mount_dir/lib/systemd" \
    2>/dev/null | head -n 20 || true
