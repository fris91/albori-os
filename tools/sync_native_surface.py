"""Copy the versioned design resources to the pinned Linux source workspace.

The Albori-owned resource directories and their settings resource inventory are
updated. Export the reviewed source changes as patches after this command.
"""
import argparse
import shutil
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-root',type=Path,default=Path.home()/'albori-build/sources')
    args=parser.parse_args()
    for name,relative in [('lomiri','qml'),('lomiri-system-settings','src/qml')]:
        qml=args.source_root/name/relative
        if not qml.is_dir():raise SystemExit(f'Missing source tree: {qml}')
        shutil.copytree(ROOT/'branding/native',qml/'Albori',dirs_exist_ok=True)
        shutil.copytree(ROOT/'branding/design',qml/'Albori/assets',dirs_exist_ok=True)
        shutil.copyfile(ROOT/'design/reference/assets/albori-logo-alba.svg',qml/'Albori/assets/logo.svg')
        shutil.copyfile(ROOT/'design/reference/assets/albori-splash-alba.png',qml/'Albori/assets/splash.png')
        for theme in ['AlboriDark','AlboriLight']:
            shutil.copytree(ROOT/'branding/themes'/theme,qml/theme,dirs_exist_ok=True)
        if name=='lomiri-system-settings':
            inventory=args.source_root/name/'src/ui.qrc'
            text=re.sub(r'    <file>qml/Albori(?:Dark|Light)?/[^<]+</file>\n','',inventory.read_text())
            entries=''.join('    <file>'+f.relative_to(args.source_root/name/'src').as_posix()+'</file>\n' for folder in ['Albori','AlboriDark','AlboriLight'] for f in sorted((qml/folder).rglob('*')) if f.is_file())
            inventory.write_text(text.replace('</qresource>',entries+'</qresource>'))
    print('Albori resources synchronized')
