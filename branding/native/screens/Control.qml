import QtQuick 2.15
import ".." as UI
UI.Scrollable {
    id:page;property var os
    Item {
        width:parent.width;height:68
        Column { x:16;y:4;spacing:4;UI.TextLabel { text:page.os?os.timeText:"07:12";size:24;font.weight:Font.DemiBold } UI.TextLabel { text:page.os&&os.previewMode?"mar 11 nov · 82%, 1 g 4 h rimanenti":"Centro di controllo";size:13;color:UI.Style.muted } }
        UI.IconButton { anchors.right:parent.right;anchors.rightMargin:16;icon:"sliders-horizontal";label:"Impostazioni";onClicked:os.navigate("settings") }
        UI.IconButton { anchors.right:parent.right;anchors.rightMargin:64;icon:"pencil";label:"Modifica comandi";onClicked:os.openDetail("Centro di controllo","") }
    }
    Grid {
        x:16;width:parent.width-32;columns:2;columnSpacing:8;rowSpacing:8
        UI.QuickTile { width:(parent.width-8)/2;title:"Wi-Fi";icon:"wifi";checked:page.os&&os.wifi;subtitle:page.os&&os.previewMode&&checked?"Casa-5G":(checked?"Attivo":"Disattivato");details:true;onToggled:os.changeControl("wifi",value);onDetailsClicked:os.sheet="wifi" }
        UI.QuickTile { width:(parent.width-8)/2;title:"Dati mobili";icon:"signal";checked:page.os&&os.mobileData;subtitle:page.os&&os.previewMode&&checked?"5G":(checked?"Attivi":"Disattivati");details:true;onToggled:os.changeControl("mobileData",value);onDetailsClicked:os.openDetail("Connessioni","cellular") }
        UI.QuickTile { width:(parent.width-8)/2;title:"Bluetooth";icon:"bluetooth";checked:page.os&&os.bluetooth;details:true;onToggled:os.changeControl("bluetooth",value);onDetailsClicked:os.openDetail("Bluetooth","bluetooth") }
        UI.QuickTile { width:(parent.width-8)/2;title:"Modalità aereo";icon:"plane";checked:page.os&&os.airplane;onToggled:os.changeControl("airplane",value) }
    }
    Item { width:parent.width;height:8 }
    Row {
        x:16;width:parent.width-32;spacing:8
        Repeater {
            model:[{icon:"flashlight",title:"Torcia",key:"torch"},{icon:"bell",title:"Silenzioso",key:"silent"},{icon:"leaf",title:"Risparmio",key:"saver"},{icon:"rotate-cw",title:"Rotazione",key:"rotation"}]
            UI.QuickTile { width:(parent.width-24)/4;compact:true;title:modelData.title;icon:modelData.icon;checked:page.os&&os[modelData.key];onToggled:os.changeControl(modelData.key,value) }
        }
    }
    Item { width:parent.width;height:8 }
    UI.ValueSlider { x:16;width:parent.width-32;value:page.os?os.brightness:70;onMoved:os.changeControl("brightness",value) }
    Item { width:parent.width;height:8 }
    UI.ValueSlider { x:16;width:parent.width-32;value:page.os?os.volume:45;icon:"volume-2";label:"Volume";onMoved:os.changeControl("volume",value) }
    UI.TextLabel { width:parent.width;x:0;height:32;verticalAlignment:Text.AlignVCenter;horizontalAlignment:Text.AlignHCenter;text:"Tocca per attivare · la freccia apre i dettagli";size:11;color:UI.Style.muted }
    UI.Section { width:parent.width;title:"Notifiche";action:"Cancella tutto";onClicked:os.notificationsVisible=false }
    Column {
        x:16;width:parent.width-32;spacing:8;visible:page.os&&os.notificationsVisible&&os.previewMode
        UI.NotificationCard { width:parent.width;appKey:"messaggi";title:"Giulia Ferri";message:"Ci vediamo alle 9 davanti alla stazione?";count:3;solid:true;actions:true;onReplyRequested:os.openApp("messaggi");onReadRequested:os.notificationsVisible=false }
        UI.NotificationCard { width:parent.width;appKey:"store";title:"2 app aggiornate";message:"Rondine 4.2, Quaderno 1.9";time:"ieri";solid:true }
    }
    UI.TextLabel { x:16;width:parent.width-32;height:64;text:"Nessuna notifica";size:15;color:UI.Style.muted;visible:page.os&&(!os.notificationsVisible||!os.previewMode) }
    Item { width:parent.width;height:16 }
}
