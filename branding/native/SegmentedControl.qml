import QtQuick 2.15
Rectangle {
    id:control
    property var options: []
    property int current: 0
    property real textSize: 15
    signal chosen(int index)
    height:48;radius:24;color:Style.surface2
    Row {
        x:4;y:4;width:parent.width-8
        Repeater {
            model:control.options
            Rectangle {
                width:parent.width/control.options.length;height:40;radius:20;color:index===control.current?Style.bg:"transparent"
                activeFocusOnTab:true
                Accessible.role:Accessible.RadioButton;Accessible.name:modelData.title||modelData;Accessible.checkable:true;Accessible.checked:index===control.current
                Keys.onReturnPressed:control.chosen(index)
                Keys.onSpacePressed:control.chosen(index)
                Row {
                    anchors.centerIn:parent;spacing:6;width:Math.min(parent.width-8,label.implicitWidth+(symbol.visible?22:0))
                    Glyph { id:symbol;name:modelData.icon||"circle";width:16;visible:Boolean(modelData.icon);anchors.verticalCenter:parent.verticalCenter }
                    TextLabel { id:label;width:parent.width-(symbol.visible?22:0);text:modelData.title||modelData;size:control.textSize;anchors.verticalCenter:parent.verticalCenter }
                }
                MouseArea { anchors.fill:parent;onClicked:control.chosen(index) }
            }
        }
    }
}
