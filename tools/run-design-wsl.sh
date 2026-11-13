#!/usr/bin/env bash
set -euo pipefail
if [ "${1:-}" = --stop ]; then exec docker stop albori-design-preview; fi
if [ -n "${1:-}" ]; then printf 'Usage: bash tools/run-design-wsl.sh [--stop]\n' >&2; exit 2; fi
source_dir=${ALBORI_SOURCE_DIR:-"$HOME/albori-build/sources/lomiri"}
metadata="$source_dir/.clickable/albori/lomiri-build:noble-network/lomiri/image.json"
image=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["name"])' "$metadata")
test -S /mnt/wslg/.X11-unix/X0
docker run --rm --pull=never --name albori-design-preview \
    --cpus 2 --memory 2g --memory-swap 2g --pids-limit 256 \
    --user "$(stat -c '%u:%g' "$source_dir")" \
    --volume "$source_dir:$source_dir" --volume /mnt/wslg/.X11-unix:/tmp/.X11-unix:ro \
    --env "DISPLAY=${DISPLAY:-:0}" --env HOME=/tmp/albori-design-home \
    --env XDG_RUNTIME_DIR=/tmp/albori-design-runtime \
    --env QT_QUICK_BACKEND=software --env QT_AUTO_SCREEN_SCALE_FACTOR=0 \
    --env QT_SCALE_FACTOR=1 --env QT_SCREEN_SCALE_FACTORS=1 \
    "$image" bash -c 'mkdir -p "$HOME" "$XDG_RUNTIME_DIR"; chmod 700 "$XDG_RUNTIME_DIR"; exec qmlscene "$1/qml/Albori/Preview.qml"' bash "$source_dir"
