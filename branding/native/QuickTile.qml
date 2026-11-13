import QtQuick 2.15
Rectangle {
    id:tile
    objectName: "quick-"+title
    property string title: ""
    property string subtitle: ""
    property string icon: "wifi"
    property bool checked: false
    property bool compact: false
    property bool details: false
    signal toggled(bool value)
    signal detailsClicked()
    height:compact?72:64;radius:24;color:checked?Style.accent:Style.surface2
    Accessible.role:Accessible.CheckBox;Accessible.name:title;Accessible.checkable:true;Accessible.checked:checked
    MouseArea { anchors.fill:parent;anchors.rightMargin:tile.details?40:0;onClicked:tile.toggled(!tile.checked) }
    Glyph { x:tile.compact?(parent.width-width)/2:14;y:tile.compact?13:(parent.height-height)/2;name:tile.icon;width:22;inverse:tile.checked&&!Style.light }
    Column {
        x:tile.compact?0:46;y:tile.compact?44:17;width:parent.width-x-(tile.details?40:8);spacing:3
        TextLabel { width:parent.width;text:tile.title;size:tile.compact?11:15;font.weight:Font.Medium;color:tile.checked?"#101114":Style.fg;horizontalAlignment:tile.compact?Text.AlignHCenter:Text.AlignLeft }
        TextLabel { width:parent.width;visible:!tile.compact;text:tile.subtitle||(tile.checked?"Attivo":"Disattivato");size:11;opacity:.72;color:tile.checked?"#101114":Style.fg }
    }
    Rectangle { visible:tile.details;width:1;height:32;anchors.right:parent.right;anchors.rightMargin:40;anchors.verticalCenter:parent.verticalCenter;color:tile.checked?"#33101114":Style.hairline }
    Item {
        visible:tile.details;width:40;height:parent.height;anchors.right:parent.right
        Glyph { anchors.centerIn:parent;name:"chevron-right";width:18;inverse:tile.checked&&!Style.light }
        MouseArea { anchors.fill:parent;onClicked:tile.detailsClicked() }
    }
}
