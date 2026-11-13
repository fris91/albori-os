import QtQuick 2.15
Flickable {
    id:scroll
    default property alias content: column.data
    contentWidth:width; contentHeight:column.height
    clip:true; boundsBehavior:Flickable.StopAtBounds
    flickableDirection:Flickable.VerticalFlick
    Column { id:column; width:scroll.width }
}
