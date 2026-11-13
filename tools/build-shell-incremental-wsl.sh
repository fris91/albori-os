#!/usr/bin/env bash
set -euo pipefail
source_dir=${ALBORI_SOURCE_DIR:-"$HOME/albori-build/sources/lomiri"}
binary_dir="$source_dir/build/x86_64-linux-gnu/lomiri"
metadata="$source_dir/.clickable/albori/lomiri-build:noble-network/lomiri/image.json"
test -f "$binary_dir/CMakeCache.txt"
image=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["name"])' "$metadata")
owner=$(stat -c '%u:%g' "$source_dir")
# Clickable 8.10 runs as root on Docker Desktop. Repair only generated build
# ownership before using the existing configured image as the source owner.
docker run --rm --pull=never --user 0:0 \
    --volume "$binary_dir:/albori-generated-build" \
    "$image" chown -R -P "$owner" /albori-generated-build
docker run --rm --pull=never --cpus 4 --memory 4g --user "$owner" \
    --env HOME=/tmp/albori-build-home \
    --volume "$source_dir:$source_dir" --workdir "$binary_dir" \
    "$image" bash -c 'mkdir -p "$HOME"; cmake "$1" && cmake --build . -j4 && DESTDIR="$PWD/install" cmake --install .' bash "$source_dir"
