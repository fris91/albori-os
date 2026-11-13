// SPDX-License-Identifier: GPL-3.0-only
pragma Singleton
import QtQuick 2.12

QtObject {
    readonly property color accent: "#F5834A"
    readonly property color accentText: "#FFA064"
    readonly property color background: "#101114"
    readonly property color surface: "#1B1D22"
    readonly property color foreground: "#F5F4F0"
    readonly property color secondary: "#B7BBC5"
    readonly property int pressDuration: 90
    readonly property int fastDuration: 160
    readonly property int baseDuration: 240
    readonly property int slowDuration: 320
    property FontLoader sansLoader: FontLoader { source: "assets/fonts/Geist-Regular.ttf" }
    property FontLoader mediumLoader: FontLoader { source: "assets/fonts/Geist-Medium.ttf" }
    property FontLoader semiboldLoader: FontLoader { source: "assets/fonts/Geist-SemiBold.ttf" }
    property FontLoader displayLoader: FontLoader { source: "assets/fonts/BodoniModa-Regular.ttf" }
    readonly property string sansFont: sansLoader.name || "Sans Serif"
    readonly property string displayFont: displayLoader.name || "Serif"

    function appKey(identity) {
        var text = String(identity).toLowerCase();
        var aliases = [
            ["impostazioni", /settings|impostazioni/], ["sicurezza", /security|privacy|sicurezza/],
            ["fotocamera", /camera|fotocamera/], ["galleria", /gallery|galleria/],
            ["calendario", /calendar|calendario/], ["orologio", /clock|orologio/],
            ["messaggi", /messag|messaging|morph.*sms/], ["telefono", /dialer|phone|telefono/],
            ["browser", /browser|morph/], ["mappe", /\bmap\b|maps|mappe|puremaps/],
            ["contatti", /contacts|address.?book|contatti/], ["email", /dekko|email|mail/],
            ["musica", /music|musica/], ["note", /notes|notebook|note\b/],
            ["file", /filemanager|file.?manager|\bfile\b/], ["store", /openstore|app.?store|\bstore\b/]
        ];
        for (var i = 0; i < aliases.length; ++i)
            if (aliases[i][1].test(text)) return aliases[i][0];
        return "";
    }
    function appIcon(identity, fallback, light) {
        var key = appKey(identity);
        return key ? Qt.resolvedUrl("assets/" + key + (light ? "-light.svg" : "-dark.svg")) : fallback;
    }
    function settingIcon(identity, fallback, light) {
        var names = { "wifi": "wifi", "bluetooth": "bluetooth", "battery": "battery",
            "sound": "volume-2", "notifications": "bell", "brightness": "sun",
            "background": "image", "appearance": "sliders-horizontal", "security-privacy": "shield-check",
            "security": "shield-check", "privacy": "shield-check", "storage": "hard-drive",
            "accessibility": "accessibility", "system-update": "refresh-cw", "updates": "refresh-cw",
            "about": "info", "language": "globe", "time-date": "clock-4", "cellular": "phone",
            "phone": "phone", "accounts": "user-round", "online-accounts": "user-round",
            "orientation-lock": "lock", "vpn": "shield-check", "hotspot": "wifi" };
        var name = names[String(identity)];
        return name ? Qt.resolvedUrl("assets/glyph-" + name + (light ? "-light.svg" : "-dark.svg")) : fallback;
    }
}
