import QtQuick 2.15
Rectangle {
    id: button
    property string icon: "arrow-left"
    property string label: ""
    property bool glass: false
    property bool accent: false
    signal clicked()
    width: 48; height: 48; radius: height/2
    color: hit.pressed ? Style.press : accent ? Style.accent : glass ? Style.glass : "transparent"
    border.width: glass || activeFocus ? 1 : 0
    border.color: activeFocus ? Style.accent : Style.hairline
    activeFocusOnTab: true
    Accessible.role: Accessible.Button
    Accessible.name: label
    Keys.onReturnPressed: clicked()
    Keys.onSpacePressed: clicked()
    Glyph { anchors.centerIn: parent; name: button.icon; width: 22; inverse: button.accent && !Style.light }
    MouseArea { id: hit; anchors.fill: parent; onClicked: button.clicked() }
}
