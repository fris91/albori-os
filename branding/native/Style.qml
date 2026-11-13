// SPDX-License-Identifier: GPL-3.0-only
pragma Singleton
import QtQuick 2.15
import Qt.labs.settings 1.0

QtObject {
    id: style
    property bool light: false
    property string themeMode: "Scuro"
    property color accent: "#F5834A"
    property string wallpaper: "alba"
    property string iconStyle: "auto"
    property bool reducedMotion: false
    property bool navigationButtons: false
    property real textScale: 1
    readonly property color bg: light ? "#F5F4F0" : "#101114"
    readonly property color sunken: light ? "#E9E7E1" : "#08090B"
    readonly property color surface: light ? "#FBFAF7" : "#1B1D22"
    readonly property color surface2: light ? "#E9E7E1" : "#25282F"
    readonly property color surface3: light ? "#D9D6CE" : "#343842"
    readonly property color fg: light ? "#101114" : "#F5F4F0"
    readonly property color muted: light ? "#4D525E" : "#B7BBC5"
    readonly property color subtle: light ? "#6A6F7C" : "#7F8594"
    readonly property color accentText: {
        var key=String(accent).toLowerCase();
        var dark={"#f5834a":"#FFA064","#ffd43b":"#FFD43B","#ee6352":"#F47E6F","#8fb89a":"#8FB89A","#7fa9d6":"#7FA9D6"};
        var pale={"#f5834a":"#B4512B","#ffd43b":"#8A6A00","#ee6352":"#B53E30","#8fb89a":"#3F6B4C","#7fa9d6":"#2F5F92"};
        return (light?pale:dark)[key]||(light?Qt.darker(accent,1.5):Qt.lighter(accent,1.12));
    }
    readonly property color hairline: light ? "#1A101114" : "#1AF5F4F0"
    readonly property color glass: light ? "#C2FBFAF7" : "#B81B1D22"
    readonly property color scrim: light ? "#52101114" : "#8F08090B"
    readonly property color press: light ? "#19101114" : "#1FF5F4F0"
    readonly property int duration: reducedMotion ? 120 : 240
    readonly property string sans: Theme.sansFont
    readonly property string display: Theme.displayFont
    readonly property var apps: [
        {key:"telefono", title:"Telefono", glyph:"phone", id:"lomiri-dialer-app"},
        {key:"messaggi", title:"Messaggi", glyph:"message-circle", id:"lomiri-messaging-app"},
        {key:"browser", title:"Browser", glyph:"compass", id:"morph-browser"},
        {key:"fotocamera", title:"Fotocamera", glyph:"camera", id:"camera.ubports_camera"},
        {key:"galleria", title:"Galleria", glyph:"image", id:"gallery.ubports_gallery"},
        {key:"file", title:"File", glyph:"folder", id:"filemanager.ubports_filemanager"},
        {key:"impostazioni", title:"Impostazioni", glyph:"sliders-horizontal", id:"lomiri-system-settings"},
        {key:"calendario", title:"Calendario", glyph:"calendar-days", id:"calendar.ubports_calendar"},
        {key:"orologio", title:"Orologio", glyph:"clock-4", id:"clock.ubports_clock"},
        {key:"mappe", title:"Mappe", glyph:"map", id:""},
        {key:"contatti", title:"Contatti", glyph:"user-round", id:"lomiri-addressbook-app"},
        {key:"email", title:"Email", glyph:"mail", id:""},
        {key:"musica", title:"Musica", glyph:"music", id:"music.ubports_music"},
        {key:"note", title:"Note", glyph:"notebook-pen", id:"notes.ubports_reminders"},
        {key:"store", title:"Store", glyph:"shopping-bag", id:"openstore.openstore-team_openstore"},
        {key:"sicurezza", title:"Sicurezza", glyph:"shield-check", id:""}
    ]
    function app(key) {
        if (key==="meteo") return {key:"meteo",title:"Meteo",glyph:"sun",id:"weather.ubports_weather"};
        for (var i=0; i<apps.length; ++i) if (apps[i].key===key) return apps[i];
        return {key:key,title:key,glyph:"circle",id:""};
    }
    // App ids of the UBports 24.04 image (deb apps and preinstalled clicks).
    // Apps not shipped in the image keep an empty id and are hidden on device.
    function installed(key) { return key==="impostazioni"||key==="sicurezza"||app(key).id!==""; }
    function glyph(name, inverse) {
        var useLight = inverse ? !light : light;
        return Qt.resolvedUrl("assets/glyph-" + name + (useLight ? "-light.svg" : "-dark.svg"));
    }
    function tile(key) { return Qt.resolvedUrl("assets/"+key+(light?"-light.svg":"-dark.svg")); }
    function chooseTheme(mode, systemLight) {
        themeMode=mode;
        light=mode==="Auto"?systemLight:mode==="Chiaro";
    }
    property Settings preferences: Settings {
        category: "AlboriAppearance"
        property alias light: style.light
        property alias themeMode: style.themeMode
        property alias accent: style.accent
        property alias wallpaper: style.wallpaper
        property alias iconStyle: style.iconStyle
        property alias reducedMotion: style.reducedMotion
        property alias navigationButtons: style.navigationButtons
        property alias textScale: style.textScale
    }
}
