import QtQuick 2.15
Rectangle {
    id: search
    objectName: "search-field"
    property alias text: input.text
    property string placeholder: "Cerca"
    property bool glass: false
    signal accepted()
    height: 48; radius: 24
    color: glass ? Style.glass : Style.surface2
    border.width: input.activeFocus || glass ? 1 : 0
    border.color: input.activeFocus ? Style.accent : Style.hairline
    Glyph { x:16; anchors.verticalCenter: parent.verticalCenter; name:"search"; width:20; opacity:.75 }
    TextInput {
        id: input;objectName:"search-input";x:46; width:parent.width-x-(clear.visible?48:16); height:parent.height
        verticalAlignment: TextInput.AlignVCenter; clip:true
        color: Style.fg; selectionColor:Style.accent; selectedTextColor:"#101114"
        font.family:Style.sans; font.pixelSize:17*Style.textScale
        activeFocusOnTab:true
        Accessible.name: search.placeholder
        onAccepted: search.accepted()
    }
    TextLabel { x:46; width:input.width; anchors.verticalCenter:parent.verticalCenter; text:search.placeholder; color:Style.muted; size:15; visible:!input.text&&!input.activeFocus }
    IconButton { id:clear; anchors.right:parent.right; visible:input.text.length>0; icon:"x"; label:"Cancella ricerca"; onClicked:input.text="" }
}
