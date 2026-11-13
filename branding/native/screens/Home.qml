// SPDX-License-Identifier: GPL-3.0-only
// Home from the Albori kit: two glass widgets, a 4 x 2 app grid, search and
// "Tutte le app", then the horizontal dock at the bottom of the screen.
import QtQuick 2.15
import ".." as UI

Item {
    id: page
    property var os
    readonly property bool preview: page.os ? os.previewMode : true
    readonly property var gridApps: preview
        ? ["calendario","mappe","galleria","email","musica","note","store","impostazioni"]
        : ["calendario","galleria","musica","note","file","orologio","store","impostazioni"].filter(function(k){ return UI.Style.installed(k); })
    readonly property var dockApps: ["telefono","messaggi","browser","fotocamera"].filter(function(k){ return preview || UI.Style.installed(k); })
    readonly property string shortDate: Qt.formatDate(new Date(), "ddd d")

    // Widgets
    Row {
        id: widgets
        x: 16; y: 12; width: parent.width - 32; height: 132; spacing: 12
        Rectangle {
            id: agenda
            width: (parent.width - 12) * 1.7 / 2.7; height: parent.height
            radius: 24; color: UI.Style.glass; border.color: UI.Style.hairline
            Column {
                x: 16; y: 16; width: parent.width - 32; spacing: 10
                UI.TextLabel { text: ("Oggi · " + (page.preview ? "mar 11" : page.shortDate)).toUpperCase(); size: 11; color: UI.Style.muted; font.letterSpacing: .8; font.weight: Font.Medium }
                Repeater {
                    model: page.preview ? [["09:30","Revisione progetto","Sala Brera"],["13:00","Pranzo con Giulia","Via Solferino"]] : []
                    Row {
                        spacing: 10; width: parent.width
                        UI.TextLabel { width: 40; text: modelData[0]; size: 13; color: UI.Style.accentText; font.weight: Font.Medium }
                        Column {
                            width: parent.width - 50
                            UI.TextLabel { width: parent.width; text: modelData[1]; size: 13; font.weight: Font.Medium }
                            UI.TextLabel { width: parent.width; text: modelData[2]; size: 12; color: UI.Style.muted }
                        }
                    }
                }
                Column {
                    visible: !page.preview; width: parent.width; spacing: 4
                    UI.TextLabel { width: parent.width; text: "Calendario"; size: 15; font.weight: Font.Medium }
                    UI.TextLabel { width: parent.width; text: "Tocca per vedere gli impegni di oggi"; size: 12; color: UI.Style.muted; wrapMode: Text.Wrap; maximumLineCount: 2 }
                }
            }
            MouseArea { anchors.fill: parent; enabled: !page.preview; onClicked: os.openApp("calendario") }
        }
        Rectangle {
            id: weather
            width: parent.width - agenda.width - 12; height: parent.height
            radius: 24; color: UI.Style.glass; border.color: UI.Style.hairline
            UI.Glyph { x: 16; y: 16; name: "sun"; width: 22 }
            Column {
                x: 16; anchors.bottom: parent.bottom; anchors.bottomMargin: 16; width: parent.width - 32
                UI.TextLabel { text: page.preview ? "9°" : "Meteo"; size: page.preview ? 44 : 24; font.family: UI.Style.display }
                UI.TextLabel { width: parent.width; text: page.preview ? "Milano · sereno" : "Apri l’app"; size: 12; color: UI.Style.muted }
            }
            MouseArea { anchors.fill: parent; enabled: !page.preview; onClicked: os.openApp("meteo") }
            Accessible.role: Accessible.Button; Accessible.name: "Meteo"
        }
    }

    // App grid, 4 columns
    Grid {
        id: grid
        x: 16; y: widgets.y + widgets.height + 28; width: parent.width - 32
        columns: 4; rowSpacing: 20
        Repeater {
            model: page.gridApps
            Item {
                width: grid.width / 4; height: 81
                UI.AppButton { anchors.horizontalCenter: parent.horizontalCenter; appKey: modelData; badge: page.preview && modelData === "email" ? 2 : 0; onClicked: os.openApp(appKey) }
            }
        }
    }

    // Search and all apps
    Row {
        id: searchRow
        x: 16; width: parent.width - 32; height: 48; spacing: 8
        anchors.bottom: dock.top; anchors.bottomMargin: 12
        Rectangle {
            width: parent.width - allApps.width - 8; height: 48; radius: 24
            color: searchHit.pressed ? UI.Style.press : UI.Style.glass; border.color: UI.Style.hairline
            Row {
                x: 16; anchors.verticalCenter: parent.verticalCenter; spacing: 10
                UI.Glyph { name: "search"; width: 20; anchors.verticalCenter: parent.verticalCenter; opacity: .8 }
                UI.TextLabel { text: "Cerca nel telefono"; size: 15; color: UI.Style.muted; anchors.verticalCenter: parent.verticalCenter }
            }
            MouseArea { id: searchHit; anchors.fill: parent; onClicked: os.navigate("drawer") }
            Accessible.role: Accessible.Button; Accessible.name: "Cerca nel telefono"
        }
        Rectangle {
            id: allApps
            width: allAppsContent.width + 32; height: 48; radius: 24
            color: allHit.pressed ? UI.Style.press : UI.Style.glass; border.color: UI.Style.hairline
            Row {
                id: allAppsContent; anchors.centerIn: parent; spacing: 8
                UI.Glyph { name: "layout-grid"; width: 18; anchors.verticalCenter: parent.verticalCenter }
                UI.TextLabel { text: "Tutte le app"; size: 15; font.weight: Font.Medium; anchors.verticalCenter: parent.verticalCenter }
            }
            MouseArea { id: allHit; anchors.fill: parent; onClicked: os.navigate("drawer") }
            Accessible.role: Accessible.Button; Accessible.name: "Tutte le app"
        }
    }

    // Horizontal dock
    Rectangle {
        id: dock
        x: 16; width: parent.width - 32; height: 80
        anchors.bottom: parent.bottom; anchors.bottomMargin: 4
        radius: 32; color: UI.Style.glass; border.color: UI.Style.hairline
        Row {
            anchors.verticalCenter: parent.verticalCenter
            Repeater {
                model: page.dockApps
                Item {
                    width: dock.width / Math.max(1, page.dockApps.length); height: 56
                    UI.AppButton { anchors.centerIn: parent; appKey: modelData; showLabel: false; badge: page.preview && modelData === "messaggi" ? 3 : 0; onClicked: os.openApp(appKey) }
                }
            }
        }
    }
}
