import QtQuick 2.15
Rectangle {
    id:slider
    property real value: 50
    property string icon: "sun"
    property string label: "Luminosità"
    property bool thin: false
    signal moved(real value)
    height:thin?32:48; radius:24; color:thin?"transparent":Style.surface2; clip:!thin
    Accessible.role:Accessible.Slider; Accessible.name:label; Accessible.description:Math.round(value)+"%"
    Rectangle { id:fill; width:Math.max(48,parent.width*slider.value/100); height:parent.height; radius:24;color:Style.fg;visible:!slider.thin }
    Rectangle { x:fill.width-24;width:24;height:parent.height;color:Style.fg;visible:!slider.thin&&slider.value<94 }
    Glyph { x:14; anchors.verticalCenter:parent.verticalCenter; name:slider.icon; width:20; inverse:true;visible:!slider.thin }
    TextLabel { anchors.right:parent.right; anchors.rightMargin:16; anchors.verticalCenter:parent.verticalCenter; text:Math.round(slider.value)+"%"; size:13; color:slider.value>88?Style.bg:Style.muted;visible:!slider.thin }
    Rectangle { width:parent.width;height:4;radius:2;anchors.verticalCenter:parent.verticalCenter;color:Style.surface3;visible:slider.thin }
    Rectangle { width:parent.width*slider.value/100;height:4;radius:2;anchors.verticalCenter:parent.verticalCenter;color:Style.accent;visible:slider.thin }
    Rectangle { x:(parent.width-20)*slider.value/100;width:20;height:20;radius:10;anchors.verticalCenter:parent.verticalCenter;color:Style.fg;visible:slider.thin;border.width:2;border.color:Style.bg }
    MouseArea { anchors.fill:parent; onPressed:slider.moved(Math.max(0,Math.min(100,mouse.x/width*100))); onPositionChanged:if(pressed)slider.moved(Math.max(0,Math.min(100,mouse.x/width*100))) }
}
