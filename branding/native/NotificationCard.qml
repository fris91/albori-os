import QtQuick 2.15
Item {
    id:card
    property string appKey: "messaggi"
    property string title: ""
    property string message: ""
    property string time: "07:04"
    property int count: 0
    property bool hiddenContent: false
    property bool solid: false
    property bool actions: false
    signal replyRequested()
    signal readRequested()
    height:Math.max(88,body.height+28)+(count>1?6:0)
    Rectangle { x:12; y:6; width:parent.width-24; height:parent.height-6; radius:24; color:Style.glass; border.color:Style.hairline; visible:card.count>1 }
    Rectangle {
        width:parent.width; height:parent.height-(card.count>1?6:0); radius:24; color:card.solid?Style.surface:Style.glass; border.color:Style.hairline
        AppButton { x:16; y:14; appKey:card.appKey; tileSize:36; showLabel:false; enabled:false }
        Column {
            id:body; x:64; y:14; width:parent.width-x-16; spacing:2
            Item {
                width:parent.width; height:14
                TextLabel { width:parent.width-40; text:Style.app(card.appKey).title.toUpperCase()+(card.count>1?" · "+card.count:""); size:11; color:Style.muted; font.letterSpacing:.44 }
                TextLabel { anchors.right:parent.right; text:card.time; size:11; color:Style.muted }
            }
            TextLabel { width:parent.width; text:card.title; size:15; font.weight:Font.Medium; visible:!card.hiddenContent }
            TextLabel { width:parent.width; text:card.hiddenContent?"Contenuto nascosto · sblocca per leggere":card.message; size:15; color:Style.muted; wrapMode:Text.Wrap; maximumLineCount:2 }
            Flow { width:parent.width;spacing:8;visible:card.actions
                ActionButton { width:88;height:36;text:"Rispondi";primary:false;onClicked:card.replyRequested() }
                ActionButton { width:164;height:36;text:"Segna come letto";primary:false;onClicked:card.readRequested() }
            }
        }
    }
}
