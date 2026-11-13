#!/usr/bin/env bash
set -euo pipefail

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
source_dir="$project_root/sources/lomiri"
schema_dir="$project_root/sources/lomiri-schemas"
build_context="$project_root/build/arm64/docker-context"
build_image=albori/lomiri-build:arm64-24.04-2.x
clickable_bin=${CLICKABLE_BIN:-"$HOME/.venvs/clickable/bin/clickable"}

test -x "$clickable_bin"
test -f "$source_dir/CMakeLists.txt"
test -f "$schema_dir/CMakeLists.txt"
docker info >/dev/null

mkdir -p "$build_context" "$project_root/build/arm64/output"
cp "$project_root/tools/Dockerfile.arm64" "$build_context/Dockerfile"
git -C "$schema_dir" archive --format=tar HEAD > "$build_context/lomiri-schemas.tar"
docker build --pull -t "$build_image" "$build_context"

cd "$source_dir"
export CLICKABLE_SKIP_DOCKER_CHECKS=1
"$clickable_bin" build \
    --config "$source_dir/clickable.arm64.yaml" \
    --arch arm64 \
    --docker-image "$build_image" \
    --clean \
    --output "$project_root/build/arm64/output" \
    "$@"
