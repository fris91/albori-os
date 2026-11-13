"""Create Qt5-compatible static instances of the supplied OFL variable fonts."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
ROOT=Path(__file__).resolve().parents[1]
folder=ROOT/'branding/design/fonts'
for weight,name in [(400,'Regular'),(500,'Medium'),(600,'SemiBold')]:
    font=TTFont(folder/'Geist.ttf')
    instantiateVariableFont(font,{'wght':weight},inplace=True,updateFontNames=True)
    font.save(folder/f'Geist-{name}.ttf')
font=TTFont(folder/'BodoniModa.ttf')
instantiateVariableFont(font,{'wght':400,'opsz':96},inplace=True,updateFontNames=True)
font.save(folder/'BodoniModa-Regular.ttf')
