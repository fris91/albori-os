#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
    echo "Run this script as root." >&2
    exit 1
fi

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
original="$project_root/device-ports/lenovo-tab-m8/verified-artifacts-job-16064434001/out/ubuntu.img"
albori="$project_root/build/arm64/images/albori-os-tb8505f-prealpha.img"
original_mount=$(mktemp -d /tmp/albori-original.XXXXXX)
albori_mount=$(mktemp -d /tmp/albori-current.XXXXXX)

cleanup() {
    mountpoint -q "$original_mount" && umount "$original_mount" || true
    mountpoint -q "$albori_mount" && umount "$albori_mount" || true
    rmdir "$original_mount" "$albori_mount" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

mount -o loop,ro "$original" "$original_mount"
mount -o loop,ro "$albori" "$albori_mount"

for pair in "original:$original_mount" "albori:$albori_mount"; do
    name=${pair%%:*}
    root=${pair#*:}
    echo "=== $name QML module locations ==="
    find "$root/usr" -type d \
        \( -path '*SystemSettings*' -o -path '*Lomiri/SystemSettings*' \) \
        | sed "s#^$root##" | sort | head -n 120
    echo "=== $name shell wrapper and environment ==="
    sed -n '1,240p' "$root/usr/libexec/lomiri-systemd-wrapper" 2>/dev/null || true
    echo "=== $name compiled install paths ==="
    strings "$root/usr/bin/lomiri" \
        | grep -E '(^|/)(share|lib)/(lomiri|qt5)' | sort -u | head -n 80 || true
    strings "$root/usr/bin/lomiri-system-settings" \
        | grep -E '(^|/)(share|lib)/(lomiri|qt5)' | sort -u | head -n 80 || true
done
