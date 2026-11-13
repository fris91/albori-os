#!/usr/bin/env bash
set -euo pipefail

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
source_dir=${ALBORI_SOURCE_DIR:-"$project_root/sources/lomiri"}
if [ -z "${ALBORI_SOURCE_DIR:-}" ] && [ ! -d "$source_dir" ] && [ -d "$HOME/albori-build/sources/lomiri" ]; then
    source_dir="$HOME/albori-build/sources/lomiri"
fi
binary_dir="$source_dir/build/x86_64-linux-gnu/lomiri"
image_metadata="$source_dir/.clickable/albori/lomiri-build:noble-network/lomiri/image.json"
target=tryShell
make_arguments=()

case "${1:-}" in
    --stop) exec docker stop albori-preview ;;
    --test) target=xvfbtestShell ;;
    --smoke) target=testShell; make_arguments+=("FUNCTION=Shell::test_customBackground Shell::test_showAndHideGreeterDBusCalls") ;;
    "") ;;
    *) printf 'Usage: bash tools/run-shell-wsl.sh [--test|--smoke|--stop]\n' >&2; exit 2 ;;
esac

docker info >/dev/null
test -f "$binary_dir/Makefile"
test -f "$image_metadata"
image_name=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["name"])' "$image_metadata")
docker image inspect "$image_name" >/dev/null

docker_arguments=(
    --rm --pull=never
    --user "$(stat -c '%u:%g' "$binary_dir/tests/qmltests")"
    --volume "$source_dir:$source_dir"
    --workdir "$binary_dir"
    --env HOME=/tmp/albori-home
    --env XDG_RUNTIME_DIR=/tmp/albori-runtime
    --env LIBGL_ALWAYS_SOFTWARE=1
)

if [ "$target" != xvfbtestShell ]; then
    test -S /mnt/wslg/.X11-unix/X0
    docker_arguments+=(
        --name "$(if [ "$target" = tryShell ]; then printf albori-preview; else printf albori-shell-smoke; fi)"
        --cpus 2 --memory 2g --memory-swap 2g --pids-limit 256
        --env LP_NUM_THREADS=2
        --env OMP_NUM_THREADS=2
        --env QT_AUTO_SCREEN_SCALE_FACTOR=0
        --env QT_SCALE_FACTOR=1
        --env QT_SCREEN_SCALE_FACTORS=1
        --env GRID_UNIT_PX=8
        --volume /mnt/wslg/.X11-unix:/tmp/.X11-unix:ro
        --env "DISPLAY=${DISPLAY:-:0}"
    )
fi

docker run "${docker_arguments[@]}" "$image_name" bash -c 'mkdir -p "$HOME" "$XDG_RUNTIME_DIR"; chmod 700 "$XDG_RUNTIME_DIR"; exec make "$@"' bash "$target" "${make_arguments[@]}"
