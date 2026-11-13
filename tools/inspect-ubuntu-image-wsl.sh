#!/usr/bin/env bash
set -euo pipefail

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
image="$project_root/device-ports/lenovo-tab-m8/verified-artifacts-job-16064434001/out/ubuntu.img"

for path in \
    /bin \
    /lib \
    /usr/bin/lomiri \
    /usr/lib/aarch64-linux-gnu/liblomiri-private.so.0 \
    /usr/lib/liblomiri-private.so.0 \
    /usr/share/lomiri \
    /usr/bin/lomiri-system-settings \
    /usr/lib/aarch64-linux-gnu/libLomiriSystemSettings.so.1 \
    /usr/lib/libLomiriSystemSettings.so.1 \
    /usr/lib/aarch64-linux-gnu/lomiri-system-settings \
    /usr/lib/lomiri-system-settings
do
    printf '\n=== %s\n' "$path"
    debugfs -R "stat $path" "$image" 2>/dev/null | head -n 5 || true
done
