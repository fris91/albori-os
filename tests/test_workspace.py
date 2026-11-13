import io
import json
import subprocess
import tarfile
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCK = json.loads((ROOT / "workspace.lock.json").read_text(encoding="utf-8"))


def git(directory, *arguments):
    result = subprocess.run(["git", "-C", str(directory), *arguments], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors="replace"))
    return result.stdout


class WorkspaceTests(unittest.TestCase):
    def test_locked_history_and_remotes(self):
        for repository in LOCK["repositories"]:
            with self.subTest(repository=repository["name"]):
                directory = ROOT / "sources" / repository["name"]
                self.assertEqual(git(directory, "rev-parse", "HEAD").decode().strip(), repository["commit"])
                self.assertEqual(git(directory, "remote", "get-url", "upstream").decode().strip(), repository["url"])
                self.assertEqual(git(directory, "remote", "get-url", "--push", "upstream").strip(), b"DISABLED")
                self.assertEqual(git(directory, "rev-parse", "--is-shallow-repository").strip(), b"false")
                self.assertEqual(git(directory, "branch", "--show-current").decode().strip(), LOCK["branch"])
                git(directory, "diff", "--check")

    def test_patches_reproduce_working_sources(self):
        temporary_root = ROOT / "build"
        temporary_root.mkdir(exist_ok=True)
        for repository in LOCK["repositories"]:
            with self.subTest(repository=repository["name"]):
                directory = ROOT / "sources" / repository["name"]
                patch = ROOT / "patches" / f"{repository['name']}.patch"
                difference = git(directory, "diff", "--binary", "--no-ext-diff", "HEAD")
                if not patch.exists():
                    self.assertFalse(difference)
                    continue
                self.assertEqual(difference, patch.read_bytes())
                changed = git(directory, "diff", "--name-only", "HEAD").decode().splitlines()
                existing = git(directory, "diff", "--name-only", "--diff-filter=M", "HEAD").decode().splitlines()
                with tempfile.TemporaryDirectory(dir=temporary_root) as temporary:
                    target = Path(temporary)
                    git(target, "init")
                    git(target, "config", "core.autocrlf", "false")
                    archive = git(directory, "-c", "core.autocrlf=false", "archive", "HEAD", "--", *existing)
                    with tarfile.open(fileobj=io.BytesIO(archive)) as source:
                        source.extractall(target, filter="data")
                    git(target, "apply", "--check", str(patch))
                    git(target, "apply", str(patch))
                    git(target, "apply", "--reverse", "--check", str(patch))
                    for relative in changed:
                        self.assertEqual((target / relative).read_bytes().replace(b"\r\n", b"\n"), (directory / relative).read_bytes().replace(b"\r\n", b"\n"))

    def test_upstream_license_inventories_unchanged(self):
        for repository in LOCK["repositories"]:
            directory = ROOT / "sources" / repository["name"]
            for relative in ["debian/copyright", "README.md"]:
                self.assertEqual((directory / relative).read_bytes().replace(b"\r\n", b"\n"), git(directory, "show", f"HEAD:{relative}"))

    def test_privacy_defaults(self):
        policy = json.loads((ROOT / "config/ai-policy.json").read_text())
        self.assertFalse(policy["remote"]["enabled"])
        self.assertFalse(policy["remote"]["sendContextAutomatically"])
        self.assertIsNone(policy["remote"]["credentialReference"])
        self.assertEqual(policy["remote"]["allowedHosts"], [])
        self.assertFalse(policy["mcp"]["enabled"])
        self.assertTrue(policy["mcp"]["toolsRequireConfirmation"])
        self.assertFalse(policy["telemetry"])
        self.assertFalse(policy["retainPrompts"])
        self.assertFalse(policy["local"]["downloadAutomatically"])


if __name__ == "__main__":
    unittest.main()
