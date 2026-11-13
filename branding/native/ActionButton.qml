import QtQuick 2.15
Rectangle {
    id: button
    property string text: "Continua"
    property string icon: ""
    property bool primary: true
    signal clicked()
    implicitWidth: content.width+48; implicitHeight: 48
    radius: 24
    color: primary ? Style.accent : Style.surface2
    opacity: enabled ? 1 : .4
    scale: hit.pressed && !Style.reducedMotion ? .97 : 1
    Behavior on scale { NumberAnimation { duration: 90 } }
    border.width: activeFocus ? 2 : 0; border.color: Style.fg
    activeFocusOnTab: true
    Accessible.role: Accessible.Button; Accessible.name: text
    Keys.onReturnPressed: clicked()
    Row {
        id: content; anchors.centerIn: parent; spacing: 8
        Glyph { visible: button.icon!==""; name: button.icon || "circle"; width: 20; anchors.verticalCenter: parent.verticalCenter; inverse: button.primary && !Style.light }
        TextLabel { text: button.text;size:button.height<=36?15:17;color: button.primary ? "#101114" : Style.fg; font.weight: Font.Medium }
    }
    MouseArea { id: hit; anchors.fill: parent; onClicked: button.clicked() }
}
