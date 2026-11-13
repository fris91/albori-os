import QtQuick 2.15
import ".." as UI
Item {
    id:page; property var os
    Column {
        y:20; width:parent.width; spacing:4
        UI.TextLabel { anchors.horizontalCenter:parent.horizontalCenter; text:page.os?os.dateText:""; size:13; color:UI.Style.muted }
        Text { anchors.horizontalCenter:parent.horizontalCenter; height:100;verticalAlignment:Text.AlignVCenter;text:page.os?os.timeText:"07:12"; color:UI.Style.fg;font.family:UI.Style.display;font.pixelSize:96;font.letterSpacing:-2.88;renderType:Text.QtRendering }
        Row {
            anchors.horizontalCenter:parent.horizontalCenter; spacing:16
            Row { spacing:6; UI.Glyph { name:"sunrise";width:16 } UI.TextLabel { text:"Alba alle 07:04";size:13;color:UI.Style.muted } }
            UI.TextLabel { text:page.os&&os.previewMode?"82% · in carica":"";size:13;color:UI.Style.muted }
        }
    }
    Column {
        y:204; x:16; width:parent.width-32; spacing:8; visible:page.os&&os.previewMode
        UI.NotificationCard { width:parent.width;appKey:"messaggi";title:"Giulia Ferri";message:"Ci vediamo alle 9 davanti alla stazione? Porto io i biglietti.";count:3 }
        UI.NotificationCard { width:parent.width;appKey:"calendario";title:"Revisione progetto · 09:30";message:"Sala Brera, secondo piano";time:"06:45" }
        UI.NotificationCard { width:parent.width;appKey:"email";count:2;hiddenContent:true;time:"06:51" }
    }
    Row {
        anchors.bottom:parent.bottom;anchors.bottomMargin:4;x:16;width:parent.width-32
        UI.IconButton { icon:"flashlight";label:"Torcia";glass:true;width:56;height:56;onClicked:os.changeControl("torch",!os.torch) }
        Item {
            width:parent.width-112;height:56
            Column { anchors.centerIn:parent; spacing:6;UI.Glyph { anchors.horizontalCenter:parent.horizontalCenter;name:"lock";width:18 } UI.TextLabel { text:"Scorri in su per sbloccare";size:13 } }
            MouseArea { anchors.fill:parent;onClicked:os.unlock() }
        }
        UI.IconButton { icon:"camera";label:"Fotocamera";glass:true;width:56;height:56;onClicked:os.openApp("fotocamera") }
    }
    MouseArea { anchors.fill:parent;anchors.bottomMargin:76;property real downY;onPressed:downY=mouse.y;onReleased:if(downY-mouse.y>60)os.unlock() }
}
