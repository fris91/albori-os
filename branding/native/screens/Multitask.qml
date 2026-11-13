// SPDX-License-Identifier: GPL-3.0-only
// App switcher from the Albori kit. In the real session the cards come from
// Lomiri's ApplicationManager; previews use sample apps.
import QtQuick 2.15
import ".." as UI

Item {
    id: page
    property var os
    readonly property bool preview: page.os ? os.previewMode : true
    property var previewApps: ["mappe","impostazioni","messaggi"]
    readonly property int cardWidth: 224
    readonly property real cardHeight: Math.max(220, Math.min(440, height - 32 - 10 - 10 - 48 - 24 - 48 - 32))

    function closeAll() {
        if (preview) { previewApps = []; return; }
        var ids = [];
        for (var i = 0; i < cards.count; ++i) {
            var app = os.appModel.get(i);
            if (app && app.appId) ids.push(app.appId);
        }
        for (var j = 0; j < ids.length; ++j) os.closeAppRequested(ids[j]);
        os.recentApps = [];
    }

    ListView {
        id: cards
        anchors.horizontalCenter: parent.horizontalCenter
        y: Math.max(16, (parent.height - height - 24 - 48) / 2)
        width: Math.min(parent.width, contentWidth > 0 ? contentWidth : parent.width)
        height: 32 + 10 + page.cardHeight + 10 + 48
        orientation: ListView.Horizontal; spacing: 12; clip: false
        boundsBehavior: Flickable.StopAtBounds
        model: page.preview ? page.previewApps : (page.os ? os.appModel : null)
        delegate: Column {
            id: task
            width: page.cardWidth; spacing: 10
            readonly property string appId: page.preview ? UI.Style.app(modelData).id : model.appId
            readonly property string appKey: page.preview ? modelData : UI.Theme.appKey(model.appId)
            readonly property string title: page.preview ? UI.Style.app(modelData).title : (model.name || model.appId)
            readonly property bool current: page.preview ? modelData === "impostazioni" : (page.os && os.focusedAppId === model.appId)
            function close() {
                if (page.preview) page.previewApps = page.previewApps.filter(function(k) { return k !== modelData; });
                else os.closeAppRequested(task.appId);
            }
            function open() {
                if (page.preview) os.openApp(modelData);
                else os.focusApp(task.appId);
            }

            Row {
                width: parent.width; height: 32; spacing: 8
                Item {
                    width: 28; height: 28; anchors.verticalCenter: parent.verticalCenter
                    UI.AppButton { visible: task.appKey !== ""; appKey: task.appKey || "telefono"; tileSize: 28; showLabel: false; enabled: false }
                    Image {
                        visible: task.appKey === "" && !page.preview; anchors.fill: parent
                        source: page.preview ? "" : (model.icon || ""); sourceSize: Qt.size(112, 112)
                        fillMode: Image.PreserveAspectFit
                    }
                }
                UI.TextLabel {
                    width: parent.width - 36 - (badge.visible ? badge.width + 8 : 0)
                    anchors.verticalCenter: parent.verticalCenter
                    text: task.title; size: 15; font.weight: Font.Medium
                }
                Rectangle {
                    id: badge; visible: task.current
                    width: badgeRow.width + 16; height: 24; radius: 12
                    anchors.verticalCenter: parent.verticalCenter
                    color: Qt.rgba(UI.Style.accent.r, UI.Style.accent.g, UI.Style.accent.b, .18)
                    Row {
                        id: badgeRow; anchors.centerIn: parent; spacing: 4
                        UI.Glyph { name: "circle-dot"; width: 12; anchors.verticalCenter: parent.verticalCenter }
                        UI.TextLabel { text: "In uso"; size: 11; color: UI.Style.accentText; font.weight: Font.Medium; anchors.verticalCenter: parent.verticalCenter }
                    }
                }
            }

            Rectangle {
                id: card
                width: page.cardWidth; height: page.cardHeight; radius: 24
                color: UI.Style.bg
                border.width: task.current ? 2 : 1
                border.color: task.current ? UI.Style.accent : UI.Style.hairline
                scale: cardHit.pressed && !UI.Style.reducedMotion ? .97 : 1
                Behavior on scale { NumberAnimation { duration: 90 } }
                Column {
                    x: 16; y: 16; width: parent.width - 32; spacing: 12
                    UI.TextLabel { width: parent.width; text: task.title; size: 20; font.weight: Font.DemiBold }
                    Repeater {
                        model: [.70, 1, .85, 1, .60, .90]
                        Rectangle { width: parent.width * modelData; height: 10; radius: 5; color: UI.Style.surface2 }
                    }
                }
                MouseArea {
                    id: cardHit; anchors.fill: parent
                    drag.target: card; drag.axis: Drag.YAxis; drag.maximumY: 0; drag.minimumY: -page.cardHeight
                    property bool moved: false
                    onPressed: moved = false
                    onPositionChanged: if (Math.abs(card.y) > 8) moved = true
                    onReleased: {
                        if (card.y < -120) task.close();
                        card.y = 0;
                        if (!moved) task.open();
                    }
                }
                Accessible.role: Accessible.Button; Accessible.name: "Apri " + task.title
            }

            Item {
                width: parent.width; height: 48
                UI.IconButton { anchors.horizontalCenter: parent.horizontalCenter; icon: "x"; label: "Chiudi " + task.title; glass: true; onClicked: task.close() }
            }
        }
    }

    UI.TextLabel {
        anchors.centerIn: parent; visible: cards.count === 0
        text: "Nessuna app aperta"; size: 17; color: UI.Style.muted
    }

    Row {
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.bottom: parent.bottom; anchors.bottomMargin: 16
        spacing: 8
        UI.ActionButton { text: "Cerca"; icon: "search"; primary: false; height: 44; onClicked: os.navigate("drawer") }
        UI.ActionButton { text: "Chiudi tutte"; icon: "layers"; primary: false; height: 44; enabled: cards.count > 0; onClicked: page.closeAll() }
    }
}
