"""Exercise the new surface inside Lomiri's real shell with upstream mocks."""
import argparse
import json
import shlex
import subprocess
from pathlib import Path

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source',type=Path,required=True)
    args=parser.parse_args()
    source=args.source.resolve();binary=source/'build/x86_64-linux-gnu/lomiri'
    probe=source/'tests/qmltests/AlboriSurfaceSmoke.qml'
    if probe.exists():raise SystemExit(f'Refusing to replace existing file: {probe}')
    name='albori-surface-smoke'
    if subprocess.run(['docker','inspect',name],capture_output=True).returncode==0:
        raise SystemExit(f'Container already exists: {name}')
    text=(source/'tests/qmltests/tst_Shell.qml').read_text()
    text=text.replace('LightDMController.userMode = "single";', 'LightDMController.userMode = "single";\n        Qt.application.organization="Albori"; Qt.application.domain="albori.local";\n        surfaceSmoke.start();',1)
    block='''    function findNative(item) {
        if(item.objectName==="albori-surface")return item;
        for(var i=0;i<item.children.length;i++){var result=findNative(item.children[i]);if(result)return result;}
        return null;
    }
    Timer { id:surfaceSmoke;interval:300
        onTriggered:{sizeSelector.selectedIndex=0;shell=shellComponent.createObject(shellRect);shell.alboriPreview=true;shell.alboriUIEnabled=true;verifySurface.start();}
    }
    Timer { id:verifySurface;interval:700
        onTriggered:{var mobile=findNative(shell);if(!mobile){console.error("ALBORI_SURFACE_MISSING");Qt.exit(2);return;}mobile.navigate("settings");saveSurface.start();}
    }
    Timer { id:saveSurface;interval:500
        onTriggered:findNative(shell).grabToImage(function(result){
            if(!result.saveToFile("__SCREENSHOT__")){Qt.exit(3);return;}
            console.log("ALBORI_SHELL_SURFACE_OK");Qt.quit();
        })
    }
'''.replace('__SCREENSHOT__',str(binary/'albori-integrated-settings.png'))
    text=text.replace('    ApplicationMenuDataLoader {',block+'    ApplicationMenuDataLoader {',1)
    probe.write_text(text)
    command=next(line for line in (binary/'tests/qmltests/CMakeFiles/tryShell.dir/build.make').read_text().splitlines() if '&& env ' in line)
    arguments=[part for part in shlex.split(command.split('&& env ',1)[1]) if part!='$(FUNCTION)']
    index=next(i for i,part in enumerate(arguments) if part.endswith('/uqmlscene'))
    image=json.loads((source/'.clickable/albori/lomiri-build:noble-network/lomiri/image.json').read_text())['name']
    try:
        result=subprocess.run(['docker','run','--rm','--pull=never','--name',name,'--cpus','2','--memory','2g',
            '--user',f'{source.stat().st_uid}:{source.stat().st_gid}',
            '-v',f'{source}:{source}','-v','/mnt/wslg/.X11-unix:/tmp/.X11-unix:ro',
            '-e','DISPLAY=:0','-e','HOME=/tmp','-e','LIBGL_ALWAYS_SOFTWARE=1','-e','LP_NUM_THREADS=2',
            '-e','QT_AUTO_SCREEN_SCALE_FACTOR=0','-e','QT_SCALE_FACTOR=1',
            image,'env',*arguments[:index],arguments[index],str(probe)],timeout=45)
    finally:
        subprocess.run(['docker','rm','-f',name],capture_output=True)
        probe.unlink()
    raise SystemExit(result.returncode)
