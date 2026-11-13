#!/usr/bin/env bash
set -euo pipefail

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
clickable=${CLICKABLE:-/home/fris91/.venvs/clickable/bin/clickable}
image=albori/lomiri-build:arm64-24.04-2.x
schema_dir="$project_root/sources/lomiri-schemas"
build_context="$project_root/build/arm64/docker-context"

test -x "$clickable"
test -f "$schema_dir/CMakeLists.txt"
mkdir -p "$build_context"
cp "$project_root/tools/Dockerfile.arm64" "$build_context/Dockerfile"
git -C "$schema_dir" archive --format=tar HEAD > "$build_context/lomiri-schemas.tar"
docker build --pull --tag "$image" "$build_context"

cd "$project_root/sources/lomiri-system-settings"
export CLICKABLE_SKIP_DOCKER_CHECKS=1
"$clickable" build \
    --config "$PWD/clickable.arm64.yaml" \
    --arch arm64 \
    --docker-image "$image" \
    --clean
