import QtQuick 2.15
Text {
    property real size: 17
    color: Style.fg
    font.family: Style.sans
    font.pixelSize: size * Style.textScale
    font.weight: Font.Normal
    renderType: Text.QtRendering
    elide: Text.ElideRight
}
