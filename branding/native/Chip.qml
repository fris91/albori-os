import QtQuick 2.15
Rectangle {
    id:chip
    property string text: ""
    property bool selected: false
    signal clicked()
    width:label.implicitWidth+28;height:36;radius:18
    color:selected?Style.fg:"transparent";border.width:selected?0:1;border.color:Style.hairline
    TextLabel { id:label;anchors.centerIn:parent;text:chip.text;size:15;font.weight:Font.Medium;color:chip.selected?Style.bg:Style.fg }
    MouseArea { anchors.fill:parent;onClicked:chip.clicked() }
}
