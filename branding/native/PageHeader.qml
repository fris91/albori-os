import QtQuick 2.15
Item {
    property string title: ""
    signal back()
    height:52
    IconButton { x:4; y:2; label:"Indietro"; onClicked:parent.back() }
    TextLabel { x:56; width:parent.width-72; anchors.verticalCenter:parent.verticalCenter; text:parent.title; size:20; font.weight:Font.DemiBold }
}
