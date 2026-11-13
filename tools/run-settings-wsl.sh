#!/usr/bin/env bash
set -euo pipefail
if [ "${1:-}" = --stop ]; then exec docker stop albori-settings-preview; fi
if [ -n "${1:-}" ]; then printf 'Usage: bash tools/run-settings-wsl.sh [--stop]\n' >&2; exit 2; fi
source_dir=${ALBORI_SETTINGS_SOURCE_DIR:-"$HOME/albori-build/sources/lomiri-system-settings"}
prefix="$source_dir/build/native/install"
test -x "$prefix/bin/lomiri-system-settings"
test -S /mnt/wslg/.X11-unix/X0
docker run --rm --pull=never --name albori-settings-preview \
    --cpus 2 --memory 2g --memory-swap 2g --pids-limit 256 \
    --user "$(stat -c '%u:%g' "$source_dir")" \
    --volume "$source_dir:$source_dir" \
    --volume /mnt/wslg/.X11-unix:/tmp/.X11-unix:ro \
    --env "DISPLAY=${DISPLAY:-:0}" --env HOME=/tmp/albori-settings-home \
    --env XDG_RUNTIME_DIR=/tmp/albori-settings-runtime \
    --env "XDG_DATA_DIRS=$prefix/share:/usr/local/share:/usr/share" \
    --env "LD_LIBRARY_PATH=$prefix/lib:$prefix/lib/lomiri-system-settings" \
    --env LIBGL_ALWAYS_SOFTWARE=1 --env LP_NUM_THREADS=2 \
    --env QT_AUTO_SCREEN_SCALE_FACTOR=0 --env QT_SCALE_FACTOR=1 \
    --env QT_SCREEN_SCALE_FACTORS=1 --env GRID_UNIT_PX=8 \
    albori/settings-build:local bash -c 'mkdir -p "$HOME" "$XDG_RUNTIME_DIR"; chmod 700 "$XDG_RUNTIME_DIR"; exec dbus-run-session -- "$1/bin/lomiri-system-settings"' bash "$prefix"
