import argparse
import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCK = json.loads((ROOT / "workspace.lock.json").read_text(encoding="utf-8"))


def git(directory, *arguments):
    return subprocess.run(
        ["git", "-C", str(directory), *arguments], check=True,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    ).stdout


def check(repository):
    directory = ROOT / "sources" / repository["name"]
    expected = [
        (("rev-parse", "HEAD"), repository["commit"]),
        (("remote", "get-url", "upstream"), repository["url"]),
        (("remote", "get-url", "--push", "upstream"), "DISABLED"),
        (("rev-parse", "--is-shallow-repository"), "false"),
        (("branch", "--show-current"), LOCK["branch"]),
    ]
    for arguments, value in expected:
        if git(directory, *arguments).decode().strip() != value:
            raise RuntimeError(f"Workspace mismatch: {repository['name']} {arguments}")
    git(directory, "diff", "--check")
    return directory


def bootstrap(repository):
    directory = ROOT / "sources" / repository["name"]
    if directory.exists():
        check(repository)
        print(f"Already present: {repository['name']}; no changes applied")
        return
    directory.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["git", "-c", "core.longpaths=true", "-c", "core.autocrlf=false", "clone", "-o", "upstream", repository["url"], str(directory)], check=True)
    git(directory, "config", "core.longpaths", "true")
    git(directory, "config", "core.autocrlf", "false")
    git(directory, "config", "remote.upstream.pushurl", "DISABLED")
    git(directory, "switch", "-c", LOCK["branch"], repository["commit"])
    patch = ROOT / "patches" / f"{repository['name']}.patch"
    if patch.exists():
        git(directory, "apply", "--check", str(patch))
        git(directory, "apply", str(patch))


def export(repository):
    directory = check(repository)
    untracked = git(directory, "ls-files", "--others", "--exclude-standard").decode().splitlines()
    if untracked:
        raise RuntimeError(f"Review new files and run git add -N first: {untracked}")
    patch = git(directory, "diff", "--binary", "--no-ext-diff", "HEAD")
    destination = ROOT / "patches" / f"{repository['name']}.patch"
    if patch:
        destination.parent.mkdir(exist_ok=True)
        destination.write_bytes(patch)
    elif destination.exists():
        raise RuntimeError(f"Refusing to overwrite existing patch with empty diff: {destination}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pinned Albori source workspace; never commits or pushes")
    parser.add_argument("action", choices=["bootstrap", "check", "export"])
    options = parser.parse_args()
    for repository in LOCK["repositories"]:
        {"bootstrap": bootstrap, "check": check, "export": export}[options.action](repository)
        print(f"OK {options.action}: {repository['name']}")
