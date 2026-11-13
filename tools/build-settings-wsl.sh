#!/usr/bin/env bash
set -euo pipefail
project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
source_root=${ALBORI_SOURCE_ROOT:-"$HOME/albori-build/sources"}
source_dir="$source_root/lomiri-system-settings"
metadata="$source_root/lomiri/.clickable/albori/lomiri-build:noble-network/lomiri/image.json"
base=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["name"])' "$metadata")
docker build --build-arg "ALBORI_BASE_IMAGE=$base" -f "$project_root/tools/Dockerfile.settings" -t albori/settings-build:local "$project_root/tools"
docker run --rm --pull=never --cpus 4 --memory 4g \
    --user "$(stat -c '%u:%g' "$source_dir")" \
    --volume "$source_dir:$source_dir" --workdir "$source_dir" \
    albori/settings-build:local bash -c 'cmake -S . -B build/native -DENABLE_TESTS=OFF -DCMAKE_INSTALL_PREFIX="$PWD/build/native/install" && cmake --build build/native -j4 && cmake --install build/native'
