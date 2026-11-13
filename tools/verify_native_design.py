"""Run the native palette/font/SVG checks in the existing Albori build image."""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    args = parser.parse_args()
    source = args.source.resolve()
    metadata = source / '.clickable/albori/lomiri-build:noble-network/lomiri/image.json'
    image = json.loads(metadata.read_text())['name']
    with tempfile.TemporaryDirectory(prefix='albori-design-', dir=source / 'build') as temporary:
        folder = Path(temporary)
        prepared=[]
        for test in (ROOT / 'tests/native').glob('tst_*.qml'):
            template=test.read_text()
            (folder / test.name).write_text(template.replace('__ALBORI_IMPORT__', (source / 'qml/Albori').as_uri()))
            prepared.append(folder/test.name)
        for test in prepared:
            result = subprocess.run([
                'docker', 'run', '--rm', '--pull=never', '--cpus', '2', '--memory', '2g',
                '--volume', f'{source}:{source}', '--env', 'HOME=/tmp',
                '--env', 'QT_QPA_PLATFORM=offscreen', '--env', 'QT_QUICK_BACKEND=software',
                '--env', f'QML2_IMPORT_PATH={source / "qml"}',
                image, 'dbus-run-session', '--', 'qmltestrunner', '-input', str(test), '-o', '-,txt'], timeout=90)
            if result.returncode:raise SystemExit(result.returncode)
