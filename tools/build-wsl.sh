#!/usr/bin/env bash
set -euo pipefail

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
source_dir=${ALBORI_SOURCE_DIR:-"$project_root/sources/lomiri"}
schema_dir=${ALBORI_SCHEMA_DIR:-"$project_root/sources/lomiri-schemas"}
build_context="$project_root/build/wsl-context"
build_image=albori/lomiri-build:noble-network

docker info >/dev/null
test -f "$source_dir/clickable.yaml"
test -f "$schema_dir/CMakeLists.txt"
schema_commit=$(git -C "$schema_dir" rev-parse HEAD)
expected_schema_commit=$(python3 -c 'import json,sys; print(next(repo["commit"] for repo in json.load(open(sys.argv[1]))["repositories"] if repo["name"] == "lomiri-schemas"))' "$project_root/workspace.lock.json")
test "$schema_commit" = "$expected_schema_commit"
mkdir -p "$build_context"
cp "$project_root/tools/Dockerfile.wsl" "$build_context/Dockerfile"
git -C "$schema_dir" archive --format=tar HEAD > "$build_context/lomiri-schemas.tar"
docker build -t "$build_image" "$build_context"
cd "$source_dir"
export CLICKABLE_SKIP_DOCKER_CHECKS=1
export CLICKABLE_DOCKER_IMAGE="$build_image"
clickable build --debug "$@"
