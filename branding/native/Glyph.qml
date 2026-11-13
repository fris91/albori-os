import QtQuick 2.15
Image {
    property string name: "circle"
    property bool inverse: false
    width: 24; height: width
    source: Style.glyph(name, inverse)
    sourceSize: Qt.size(width*4,height*4)
    fillMode: Image.PreserveAspectFit
    Accessible.ignored: true
}
