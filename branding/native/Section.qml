import QtQuick 2.15
Item {
    property string title: ""
    property string action: ""
    signal clicked()
    height:45
    TextLabel { x:16; anchors.bottom:parent.bottom; anchors.bottomMargin:8; text:parent.title.toUpperCase(); size:11; font.letterSpacing:.88; color:Style.subtle }
    TextLabel { anchors.right:parent.right; anchors.rightMargin:16; anchors.bottom:parent.bottom; anchors.bottomMargin:8; text:parent.action; size:13; color:Style.accentText }
    MouseArea { anchors.right:parent.right; width:140; height:parent.height; enabled:parent.action!==""; onClicked:parent.clicked() }
}
