import argparse
import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Syntax parsing only; does not validate Lomiri imports or runtime")
    parser.add_argument("--qmlformat", required=True, type=Path)
    arguments = parser.parse_args()
    results = []
    lock = json.loads((ROOT / "workspace.lock.json").read_text())
    for repository in lock["repositories"]:
        directory = ROOT / "sources" / repository["name"]
        changed = subprocess.check_output(["git", "-C", str(directory), "diff", "--name-only", "HEAD"], text=True).splitlines()
        for relative in changed:
            if relative.endswith(".qml"):
                result = subprocess.run([str(arguments.qmlformat.resolve()), "--ignore-settings", str(directory / relative)], stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
                results.append({"file": f"{repository['name']}/{relative}", "exitCode": result.returncode, "diagnostics": result.stderr})
    report = {"scope": "QML syntax only; no module resolution, binding checks, or Qt5 runtime validation", "files": results}
    (ROOT / "reports").mkdir(exist_ok=True)
    (ROOT / "reports/qml-syntax.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))
    raise SystemExit(0 if results and all(result["exitCode"] == 0 for result in results) else 1)
