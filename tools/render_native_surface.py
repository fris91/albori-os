"""Render the actual Qt5 surface to PNGs in the existing build container."""
import argparse
import json
import subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source',type=Path,required=True)
    args=parser.parse_args()
    source=args.source.resolve()
    output=source/'build/albori-renders'
    output.mkdir(parents=True,exist_ok=True)
    image=json.loads((source/'.clickable/albori/lomiri-build:noble-network/lomiri/image.json').read_text())['name']
    states=[{'screen':screen,'light':False} for screen in ['lock','home','drawer','control','settings','personal','privacy','multitask','store','updates']]
    states += [{'screen':screen,'light':True} for screen in ['home','settings']]
    states += [{'screen':screen,'light':False,'width':320,'height':700} for screen in ['home','control','personal']]
    template='''import QtQuick 2.15
import QtQuick.Window 2.15
import "__IMPORT__" as UI
Window {
    id:window;visible:true;width:390;height:844
    Component.onCompleted: { Qt.application.organization="Albori"; Qt.application.domain="albori.local"; }
    property var states: __STATES__
    property int step: 0
    UI.Surface { id:surface;anchors.fill:parent;previewMode:true }
    Timer { id:prepare;interval:100;running:true
        onTriggered: {
            UI.Style.accent="#F5834A"; UI.Style.iconStyle="auto"; UI.Style.wallpaper="alba";
            UI.Style.navigationButtons=false; UI.Style.textScale=1; UI.Style.themeMode=window.states[window.step].light?"Chiaro":"Scuro";
            UI.Style.light=window.states[window.step].light;
            window.width=window.states[window.step].width||390;
            window.height=window.states[window.step].height||844;
            surface.screen=window.states[window.step].screen;
            capture.start();
        }
    }
    Timer { id:capture;interval:500
        onTriggered:surface.grabToImage(function(result) {
            var state=window.states[window.step];
            var path="__OUTPUT__/"+state.screen+(state.light?"-light":"-dark")+(state.width?"-"+state.width:"")+".png";
            if(!result.saveToFile(path)){console.error("SAVE FAILED",path);Qt.exit(2);return;}
            console.log("RENDERED",path); window.step++;
            if(window.step>=window.states.length)Qt.quit();else prepare.start();
        })
    }
}'''
    qml=output/'Render.qml'
    qml.write_text(template.replace('__IMPORT__',(source/'qml/Albori').as_uri()).replace('__STATES__',json.dumps(states)).replace('__OUTPUT__',str(output)))
    result=subprocess.run(['docker','run','--rm','--pull=never','--cpus','2','--memory','2g',
        '--user',str(source.stat().st_uid)+':'+str(source.stat().st_gid),
        '-v',f'{source}:{source}','-e','HOME=/tmp','-e','QT_QPA_PLATFORM=offscreen',
        '-e','QT_QUICK_BACKEND=software',image,'qmlscene',str(qml)],timeout=60)
    raise SystemExit(result.returncode)
