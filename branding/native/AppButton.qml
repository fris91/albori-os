import QtQuick 2.15
Item {
    id: app
    objectName: "app-"+appKey
    property string appKey: "telefono"
    property int tileSize: 56
    property bool showLabel: true
    property int badge: 0
    signal clicked()
    width: showLabel ? Math.max(tileSize+16,72) : tileSize
    height: showLabel ? tileSize+25*Style.textScale : tileSize
    activeFocusOnTab: true
    Accessible.role: Accessible.Button; Accessible.name: Style.app(appKey).title
    Keys.onReturnPressed: clicked()
    Rectangle {
        id: tile; width: app.tileSize; height: width
        anchors.horizontalCenter: parent.horizontalCenter
        radius: width*.28
        color: Style.iconStyle==="alba" ? Style.accent : "transparent"
        border.width: Style.iconStyle==="contorno" || app.activeFocus ? 1.5 : 0
        border.color: app.activeFocus ? Style.accent : Style.fg
        scale: hit.pressed && !Style.reducedMotion ? .94 : 1
        Behavior on scale { NumberAnimation { duration: 90 } }
        Image { anchors.fill: parent; source: Style.tile(app.appKey); visible: Style.iconStyle==="auto"; sourceSize: Qt.size(app.tileSize*4,app.tileSize*4) }
        Glyph { anchors.centerIn: parent; name: Style.app(app.appKey).glyph; width: app.tileSize*.46; visible: Style.iconStyle!=="auto"; inverse: Style.iconStyle==="alba" && !Style.light }
        Rectangle {
            visible: app.badge>0; width: 20; height: 20; radius: 10
            color: Style.accent; anchors.right: parent.right; anchors.top: parent.top; anchors.rightMargin: -3; anchors.topMargin: -3
            TextLabel { anchors.centerIn: parent; text: app.badge; size: 11; color: "#101114"; font.weight: Font.DemiBold }
        }
    }
    TextLabel { y: app.tileSize+6; width: parent.width; horizontalAlignment: Text.AlignHCenter; text: Style.app(app.appKey).title; size: 11; font.weight: Font.Medium; visible: app.showLabel }
    MouseArea { id: hit; anchors.fill: parent; onClicked: app.clicked() }
}
