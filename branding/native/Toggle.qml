import QtQuick 2.15
Rectangle {
    id: control
    property bool checked: false
    property string label: ""
    signal toggled(bool value)
    width:52; height:32; radius:16
    color:checked?Style.accent:Style.surface3
    border.width:checked?0:1; border.color:Style.hairline
    activeFocusOnTab:true
    Accessible.role:Accessible.CheckBox; Accessible.name:label; Accessible.checkable:true; Accessible.checked:checked
    function toggle() { toggled(!checked); }
    Keys.onSpacePressed: toggle()
    Rectangle {
        x:control.checked?24:4; y:4; width:24; height:24; radius:12
        color:control.checked?"#101114":Style.muted
        Behavior on x { NumberAnimation { duration:Style.reducedMotion?0:160; easing.type:Easing.OutCubic } }
        Rectangle { anchors.centerIn:parent; width:control.checked?2:8; height:8; radius:control.checked?1:4; color:control.checked?Style.accent:"transparent"; border.width:control.checked?0:1; border.color:Style.bg }
    }
    MouseArea { anchors.fill:parent; anchors.margins:-8; onClicked:control.toggle() }
}
