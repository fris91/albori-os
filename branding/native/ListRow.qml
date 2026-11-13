import QtQuick 2.15
Item {
    id: row
    objectName: "row-"+title
    property string title: ""
    property string subtitle: ""
    property string icon: ""
    property string appKey: ""
    property string value: ""
    property bool chevron: false
    property bool switchControl: false
    property bool checked: false
    property bool divider: true
    signal clicked()
    signal toggled(bool value)
    height: Math.max(subtitle?72:56, words.height+20)
    Accessible.role:Accessible.Button; Accessible.name:title+(subtitle?", "+subtitle:"")
    activeFocusOnTab: true
    Keys.onReturnPressed: clicked()
    Rectangle { anchors.fill:parent; color: hit.pressed ? Style.press : "transparent"; border.width:parent.activeFocus?1:0; border.color:Style.accent }
    Glyph { x:16; anchors.verticalCenter:parent.verticalCenter; name:row.icon||"circle"; visible:row.icon!==""&&!row.appKey; width:24 }
    AppButton { x:16; anchors.verticalCenter:parent.verticalCenter; appKey:row.appKey||"telefono"; tileSize:32; showLabel:false; visible:row.appKey!==""; enabled:false }
    Column {
        id:words; x:row.icon||row.appKey?56:16; width:row.width-x-(row.switchControl?84:row.value?Math.min(row.width*.46,160):row.chevron?48:16); spacing:3; anchors.verticalCenter:parent.verticalCenter
        TextLabel { width:parent.width; text:row.title; size:17; wrapMode:Text.Wrap; maximumLineCount:2 }
        TextLabel { width:parent.width; text:row.subtitle; size:13; color:Style.muted; visible:text!==""; wrapMode:Text.Wrap; maximumLineCount:2 }
    }
    TextLabel { anchors.right:chevronIcon.left; anchors.rightMargin:8; anchors.verticalCenter:parent.verticalCenter; text:row.value; size:13; color:Style.muted; width:Math.min(145,implicitWidth); horizontalAlignment:Text.AlignRight; visible:!row.switchControl }
    Glyph { id:chevronIcon; name:"chevron-right"; width:18; anchors.right:parent.right; anchors.rightMargin:16; anchors.verticalCenter:parent.verticalCenter; opacity:row.chevron?1:0 }
    Rectangle { x:row.icon||row.appKey?56:16; anchors.bottom:parent.bottom; width:parent.width-x-16; height:1; color:Style.hairline; visible:row.divider }
    MouseArea { id:hit; anchors.fill:parent; onClicked:row.switchControl?row.toggled(!row.checked):row.clicked() }
    Toggle { anchors.right:parent.right; anchors.rightMargin:16; anchors.verticalCenter:parent.verticalCenter; visible:row.switchControl; checked:row.checked; label:row.title; onToggled:row.toggled(value) }
}
