"""Translate the supplied semantic CSS tokens to complete Lomiri themes."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
css = (ROOT / 'design/reference/tokens/colors.css').read_text(encoding='utf-8')
dark = dict(re.findall(r'--([\w-]+):([^;]+);', css.split('[data-theme="light"]')[0]))
light = dict(dark)
light.update(dict(re.findall(r'--([\w-]+):([^;]+);', css.split('[data-theme="light"]{')[1].split('}')[0])))
roles = dict(background='bg', backgroundText='fg-1', backgroundSecondaryText='fg-2',
    backgroundTertiaryText='fg-3', base='surface-1', baseText='fg-1', foreground='surface-1',
    foregroundText='fg-1', raised='accent', raisedText='on-accent', raisedSecondaryText='on-accent',
    overlay='surface-1', overlayText='fg-1', overlaySecondaryText='fg-2', field='surface-2',
    fieldText='fg-1', focus='accent', focusText='on-accent', selection='accent-soft',
    selectionText='fg-1', positive='success', positiveText='on-accent', negative='danger',
    negativeText='on-accent', activity='accent', activityText='on-accent', positionText='accent-text')


def resolve(tokens, key):
    value = tokens[key].strip()
    if value.startswith('var('):
        return resolve(tokens, value[6:-1])
    if value.startswith('rgba('):
        r, g, b, a = map(float, value[5:-1].split(','))
        return '#%02X%02X%02X%02X' % (round(a * 255), round(r), round(g), round(b))
    return value


for name, tokens, parent in [('AlboriDark', dark, 'SuruDark'), ('AlboriLight', light, 'Ambiance')]:
    folder = ROOT / 'branding/themes' / name
    folder.mkdir(parents=True, exist_ok=True)
    (folder / '1.3').mkdir(exist_ok=True)
    lines = ['// SPDX-License-Identifier: GPL-3.0-only', 'import QtQuick 2.12',
        f'import Lomiri.Components.Themes.{parent} 1.3 as Base', '', 'Base.Palette {']
    for state in ['normal', 'selected', 'highlighted', 'focused', 'disabled', 'selectedDisabled']:
        for role, token in roles.items():
            if state in ('selected', 'highlighted', 'selectedDisabled') and role in ('background', 'base', 'foreground'):
                token = 'surface-2'
            value = resolve(tokens, token)
            if state == 'focused' and role == 'background':
                value = resolve(tokens, 'accent-soft')
            if state in ('disabled', 'selectedDisabled'):
                color = value.lstrip('#')
                value = '#%02X%s' % (round((int(color[:2],16) if len(color) == 8 else 255)*.4), color[-6:])
            lines.append(f'    {state}.{role}: "{value}"')
        lines.append(f'    {state}.position: "transparent"')
    lines.append('}')
    (folder / 'Palette.qml').unlink(missing_ok=True)
    (folder / '1.3/Palette.qml').write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
    (folder / 'qmldir').write_text(f'module {name}\nPalette 1.3 1.3/Palette.qml\n', newline='\n')
    (folder / 'parent_theme').write_text(f'Lomiri.Components.Themes.{parent}\n', newline='\n')
