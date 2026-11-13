#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
    echo "Run this script as root." >&2
    exit 1
fi

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
image="$project_root/build/arm64/images/albori-os-tb8505f-prealpha.img"
mount_dir=$(mktemp -d /tmp/albori-sanitize.XXXXXX)

cleanup() {
    if mountpoint -q "$mount_dir"; then
        umount "$mount_dir"
    fi
    rmdir "$mount_dir" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

e2fsck -fn "$image"
mount -o loop,rw "$image" "$mount_dir"
rm -f "$mount_dir/usr/share/lomiri-system-settings/qml-plugins/about/fakepkgslist.xml"
sync
umount "$mount_dir"
e2fsck -fy "$image"
sha256sum "$image"
