"""Export the supplied CSS/React design to offline assets for Qt5.

Input: lucide-static 0.460.0's official npm tarball (never executed).
The original design remains in design/reference; no remote assets at runtime.
"""
import argparse
import re
import tarfile
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
APPS = dict(zip(
    'telefono messaggi browser fotocamera galleria file impostazioni calendario orologio mappe contatti email musica note store sicurezza'.split(),
    'phone message-circle compass camera image folder sliders-horizontal calendar-days clock-4 map user-round mail music notebook-pen shopping-bag shield-check'.split()))
EXTRAS = ('wifi bluetooth sun volume-2 bell battery hard-drive accessibility refresh-cw info chevron-right search lock fingerprint globe download grid-2x2 '
    'arrow-left arrow-up chevron-left circle square x check sunrise signal battery-medium battery-charging plane flashlight bell-off leaf rotate-cw '
    'palette eye-off layout-grid pencil type wind navigation-2 mic navigation circle-dot file-down layers plus users-round package-check code file-check history moon hand file-text').split()


def export(archive, destination):
    destination.mkdir(parents=True, exist_ok=True)
    with tarfile.open(archive) as bundle:
        notice = bundle.extractfile('package/LICENSE').read().decode()
        (destination / 'Lucide-LICENSE').write_text('\n'.join(line.rstrip() for line in notice.splitlines()) + '\n', encoding='utf-8', newline='\n')
        glyphs = {}
        for name in sorted(set(APPS.values()) | set(EXTRAS)):
            raw = bundle.extractfile(f'package/icons/{name}.svg').read().decode().replace('\r\n', '\n')
            glyphs[name] = re.sub(r'^.*?<svg[^>]*>|</svg>\s*$', '', raw, flags=re.S)
        for mode in ('dark', 'light'):
            light = mode == 'light'
            fg, top, bottom, edge = ('#101114', '#FFFFFF', '#ECEAE4', '#101114') if light else ('#F5F4F0', '#2B2E36', '#17191D', '#F5F4F0')
            defs = f'<defs><linearGradient id="tile" x2="0" y2="1"><stop stop-color="{top}"/><stop offset="1" stop-color="{bottom}"/></linearGradient><radialGradient id="glow" cx=".5" cy="1.23" r=".7"><stop stop-color="#F5834A" stop-opacity=".34"/><stop offset="1" stop-color="#F5834A" stop-opacity="0"/></radialGradient></defs>'
            for app, glyph in APPS.items():
                content = glyphs[glyph].replace('currentColor', fg)
                svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">{defs}<rect x=".5" y=".5" width="55" height="55" rx="15.68" fill="url(#tile)"/><rect x=".5" y=".5" width="55" height="55" rx="15.68" fill="url(#glow)"/><rect x=".5" y=".5" width="55" height="55" rx="15.68" fill="none" stroke="{edge}" stroke-opacity="{.10 if light else .14}"/><g transform="translate(15 15) scale(1.083333)" fill="none" stroke="{fg}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">{content}</g></svg>'
                ET.fromstring(svg)
                (destination / f'{app}-{mode}.svg').write_text(svg, encoding='utf-8', newline='\n')
            for name, content in glyphs.items():
                svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="{fg}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">{content.replace("currentColor", fg)}</svg>'
                (destination / f'glyph-{name}-{mode}.svg').write_text(svg, encoding='utf-8', newline='\n')
            sky = ['#F5F4F0','#F3ECE3','#FAD9BF','#F7A877'] if light else ['#0B0C10','#15161C','#3A2622','#C4623A']
            core, sun, ground, bg = ('#FFF6EC','#FFC59A','#EDE9E1','#F5F4F0') if light else ('#FFB27A','#F5834A','#0D0E11','#101114')
            svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844"><defs>
<linearGradient id="sky" x2="0" y2="1">{''.join(f'<stop offset="{pos}" stop-color="{color}"/>' for pos,color in zip(('0','.42','.66','.78'),sky))}</linearGradient>
<radialGradient id="glow"><stop stop-color="{sun}" stop-opacity=".5"/><stop offset=".7" stop-color="{sun}" stop-opacity="0"/></radialGradient>
<radialGradient id="sun" cx=".5" cy=".3" r=".7"><stop stop-color="{core}"/><stop offset="1" stop-color="{sun}"/></radialGradient>
<linearGradient id="ground" x2="0" y2="1"><stop stop-color="{ground}"/><stop offset="1" stop-color="{bg}"/></linearGradient></defs>
<rect width="390" height="844" fill="url(#sky)"/><circle cx="195" cy="658.32" r="351" fill="url(#glow)"/><circle cx="195" cy="658.32" r="167.7" fill="url(#sun)"/><rect y="658.32" width="390" height="185.68" fill="url(#ground)"/><path d="M0 658.32H390" stroke="{core}" stroke-opacity=".5"/></svg>'''
            (destination / f'wallpaper-{mode}.svg').write_text(svg, encoding='utf-8', newline='\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archive', type=Path)
    parser.add_argument('--output', type=Path, default=ROOT / 'branding/design')
    args = parser.parse_args()
    export(args.archive, args.output)
