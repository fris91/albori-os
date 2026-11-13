import QtQuick 2.15
import QtQuick.Window 2.15
Window {
    id:window
    visible:true
    width:390;height:844
    minimumWidth:320;minimumHeight:640
    title:"Albori OS · Anteprima nativa"
    color:"#101114"
    Loader { id:surfaceLoader;anchors.fill:parent;active:false;sourceComponent:Surface { previewMode:true } }
    Component.onCompleted: {
        Qt.application.organization="Albori";
        Qt.application.domain="albori.local";
        surfaceLoader.active=true;
    }
}
