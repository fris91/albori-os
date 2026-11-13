// SPDX-License-Identifier: GPL-3.0-only
// Native mobile surface translated from the user-supplied Albori design kit.
import QtQuick 2.15

Item {
    id:os
    objectName:"albori-surface"
    property string screen: "lock"
    property var history: []
    property bool previewMode: false
    property bool sessionLocked: true
    property bool chromeVisible: true
    // Injected by the real Lomiri shell. Standalone previews leave these null.
    property Component musicWidgetComponent
    property Component calendarWidgetComponent
    property bool systemLight: previewMode ? true : false
    onSystemLightChanged: if(Style.themeMode==="Auto")Style.light=systemLight
    property alias pageStatus: page.status
    property alias pageItem: page.item
    property string detailTitle: ""
    property string selectedApp: ""
    property string pendingApp: ""
    property string sheet: ""
    property string query: ""
    property bool wifi: true
    property bool bluetooth: false
    property bool airplane: false
    property bool mobileData: true
    property bool torch: false
    property bool silent: false
    property bool saver: false
    property bool rotation: false
    property bool hotspot: false
    property bool nfc: false
    property bool autoBrightness: true
    property bool nightLight: false
    property bool vibration: true
    property bool doNotDisturb: false
    property bool notificationPreview: true
    property bool locationAccess: true
    property bool biometricUnlock: false
    property bool autoUpdate: true
    property bool highContrast: false
    property real brightness: 70
    property real volume: 45
    property int battery: previewMode?82:-1
    property string timeText: previewMode?"07:12":Qt.formatTime(new Date(),"hh:mm")
    property string dateText: previewMode?"martedì 11 novembre":Qt.formatDate(new Date(),"dddd d MMMM")
    property var recentApps: previewMode?["impostazioni","mappe","messaggi"]:[]
    property bool notificationsVisible: true
    // Real session wiring, injected by Shell.qml. Previews leave these unset.
    property var appModel: null
    property var controls: null
    property string focusedAppId: ""
    property bool keyboardVisible: false
    property real appTopInset: 44
    readonly property real statusHeight: isApp ? Math.max(24, appTopInset) : 44
    readonly property bool gesturesEnabled: !Style.navigationButtons && ["lock","auth"].indexOf(screen)<0 && (previewMode || !sessionLocked)
    signal focusAppRequested(string appId)
    signal closeAppRequested(string appId)
    onFocusedAppIdChanged: {
        if (previewMode || sessionLocked) return;
        if (focusedAppId === "") { if (screen === "app") navigate("home"); }
        else if (!isApp && screen !== "multitask") navigate("app");
    }
    readonly property bool hasWallpaper: ["lock","home","drawer","control","multitask"].indexOf(screen)>=0
    readonly property bool isApp: screen==="app"||screen==="auth"
    signal launchRequested(string appId, string appKey)
    signal settingsRequested(string plugin)
    signal unlockRequested()
    function navigate(target) {
        if(!previewMode&&sessionLocked&&["lock","auth"].indexOf(target)<0)return;
        if(target===screen)return;
        history=target==="home"||target==="lock"?[]:history.concat([screen]);
        screen=target; sheet="";
    }
    function back() {
        if(!previewMode&&sessionLocked)return;
        if(sheet){sheet="";return;}
        var previous=history.slice(); var target=previous.pop()||"home";
        history=previous; screen=target==="lock"?"home":target;
    }
    function unlock() {
        // In a real session the authenticated greeter controls the transition.
        if(previewMode){sessionLocked=false;navigate("home");unlockRequested();}
        else{navigate("auth");unlockRequested();}
    }
    function showHome() { if(screen!=="lock")navigate("home"); }
    function openApp(key) {
        if(sessionLocked&&!previewMode){pendingApp=key;unlock();return;}
        selectedApp=key;
        if(key==="impostazioni"){navigate("settings");return;}
        if(key==="sicurezza"){navigate("privacy");return;}
        if(key==="store"&&previewMode){navigate("store");return;}
        var apps=recentApps.filter(function(app){return app!==key;});
        recentApps=[key].concat(apps).slice(0,8);
        if(previewMode){detailTitle=Style.app(key).title;navigate("detail");return;}
        var appId=Style.app(key).id;
        if(!appId)return;
        launchRequested(appId,key);navigate("app");
    }
    function focusApp(appId) {
        if(!appId)return;
        if(previewMode){openApp(Theme.appKey(appId)||appId);return;}
        focusAppRequested(appId);navigate("app");
    }
    function openDetail(title,plugin) { detailTitle=title; selectedApp=plugin||"";navigate("detail"); }
    function closeRecent(key) {
        recentApps=recentApps.filter(function(app){return app!==key;});
    }
    function changeControl(key,value) {
        if(previewMode){os[key]=value;return;}
        if(controls&&controls.apply(key,value))return;
        if(key==="brightness"||key==="volume")return;
        detailTitle=key==="wifi"||key==="airplane"||key==="mobileData"?"Connessioni":"Controlli del dispositivo";selectedApp=key;navigate("detail");
    }
    focus:true
    Keys.onEscapePressed:back()
    Keys.onPressed: {
        if(event.key===Qt.Key_Home){showHome();event.accepted=true;}
    }
    Rectangle { anchors.fill:parent; color:Style.bg; visible:!os.isApp }
    Wallpaper { anchors.fill:parent;visible:os.hasWallpaper }
    Rectangle { anchors.fill:parent; visible:os.hasWallpaper&&["lock","home"].indexOf(os.screen)<0; color:Style.scrim }
    Item {
        id:status; width:parent.width; height:os.statusHeight;visible:os.chromeVisible
        Rectangle { anchors.fill:parent; color:Style.bg; visible:os.isApp }
        TextLabel { x:24; anchors.verticalCenter:parent.verticalCenter; text:os.timeText; size:15; font.weight:Font.DemiBold }
        Row {
            anchors.right:parent.right; anchors.rightMargin:24; anchors.verticalCenter:parent.verticalCenter; spacing:5
            Glyph { name:"signal"; width:16; anchors.verticalCenter:parent.verticalCenter }
            Glyph { name:"wifi"; width:16; anchors.verticalCenter:parent.verticalCenter; opacity:os.wifi?1:.4 }
            Glyph { name:"battery-medium"; width:20; anchors.verticalCenter:parent.verticalCenter }
            TextLabel { text:os.battery>=0?os.battery+"%":""; size:11; anchors.verticalCenter:parent.verticalCenter }
        }
        MouseArea { anchors.fill:parent; enabled:["lock","auth"].indexOf(os.screen)<0; onClicked:os.navigate("control"); property real startY; onPressed:startY=mouse.y; onReleased:if(mouse.y-startY>30)os.navigate("control") }
    }
    Item {
        id:body; x:0; y:os.chromeVisible?os.statusHeight:0; width:parent.width; height:parent.height-y-nav.height
        Loader {
            id:page; anchors.fill:parent; active:!os.isApp
            property var controller:os
            source: "screens/"+({lock:"Lock",home:"Home",drawer:"Drawer",control:"Control",settings:"Settings",personal:"Personal",privacy:"Privacy",multitask:"Multitask",store:"Store",updates:"Updates",detail:"Detail"}[os.screen]||"Home")+".qml"
            onLoaded: {
                item.os=os;
                entrance.restart();
            }
            NumberAnimation { id:entrance; target:page; property:"opacity"; from:0; to:1; duration:Style.duration }
        }
    }
    Item {
        id:nav; width:parent.width; anchors.bottom:parent.bottom
        // Over an app the gesture strip floats on the content (as on Android);
        // it disappears while the on-screen keyboard is open.
        height:!os.chromeVisible?0:Style.navigationButtons?48:(os.isApp?(os.keyboardVisible?0:22):28)
        visible:os.chromeVisible&&height>0
        Rectangle { anchors.fill:parent; visible:os.isApp&&Style.navigationButtons; color:Style.bg }
        Row {
            visible:Style.navigationButtons; anchors.centerIn:parent; spacing:Math.max(0,(os.width-224)/2)
            IconButton { icon:"chevron-left"; label:"Indietro"; onClicked:os.back() }
            IconButton { icon:"circle"; label:"Home"; onClicked:os.showHome() }
            IconButton { icon:"square"; label:"App recenti"; onClicked:os.navigate("multitask") }
        }
        Rectangle {
            id:pill; visible:!Style.navigationButtons&&os.screen!=="lock"; width:120; height:4; radius:2
            anchors.horizontalCenter:parent.horizontalCenter
            y:(parent.height-height)/2-Math.min(48,Math.max(0,bottomGesture.distance*.35))
            color:Style.fg; opacity:os.isApp?.55:.9
            border.width:os.isApp?1:0; border.color:Style.light?"#66F5F4F0":"#66101114"
        }
    }
    // Swipe up from the bottom edge: release = Home, pause before releasing = App recenti.
    MouseArea {
        id:bottomGesture
        z:4; width:parent.width; anchors.bottom:parent.bottom
        height:os.isApp?22:28
        enabled:os.gesturesEnabled&&!(os.isApp&&os.keyboardVisible)
        visible:enabled
        preventStealing:true
        property real startY:0
        property real lastY:0
        property real distance:0
        property double lastMove:0
        property bool recents:false
        onPressed:{startY=mouse.y;lastY=mouse.y;distance=0;recents=false;lastMove=Date.now();holdTimer.restart();}
        onPositionChanged:{
            distance=Math.max(0,startY-mouse.y);
            if(Math.abs(mouse.y-lastY)>6){lastY=mouse.y;lastMove=Date.now();if(!recents)holdTimer.restart();}
        }
        onReleased:{
            holdTimer.stop();
            var d=distance; distance=0;
            if(recents){recents=false;os.navigate("multitask");return;}
            if(d>40)os.showHome();
            else if(d<10&&!os.isApp)os.showHome();
        }
        onCanceled:{holdTimer.stop();distance=0;recents=false;}
        Timer {
            id:holdTimer; interval:260
            onTriggered:{
                if(bottomGesture.pressed&&bottomGesture.distance>90&&Date.now()-bottomGesture.lastMove>=240)
                    bottomGesture.recents=true;
                else if(bottomGesture.pressed)restart();
            }
        }
        Accessible.role:Accessible.Button; Accessible.name:"Home. Scorri in su e fermati per le app recenti"
    }
    Rectangle {
        // Feedback while the bottom gesture is in progress.
        z:4; visible:bottomGesture.distance>40
        anchors.horizontalCenter:parent.horizontalCenter; anchors.bottom:parent.bottom
        anchors.bottomMargin:Math.min(140,bottomGesture.distance*.6)+20
        width:hintLabel.width+32; height:36; radius:18; color:Style.surface; border.color:Style.hairline
        opacity:Math.min(1,(bottomGesture.distance-40)/60)
        TextLabel { id:hintLabel; anchors.centerIn:parent; size:13; font.weight:Font.Medium
            text:bottomGesture.recents?"Rilascia per le app recenti":"Rilascia per la Home" }
    }
    // Swipe inward from either side edge = Indietro.
    Repeater {
        model:["left","right"]
        MouseArea {
            id:edge
            readonly property bool fromRight:modelData==="right"
            z:4; width:16; x:fromRight?os.width-width:0
            y:os.statusHeight; height:os.height-y-(os.isApp?(os.keyboardVisible?0:22):28)
            enabled:os.gesturesEnabled&&os.screen!=="home"
            visible:enabled
            preventStealing:true
            property real startX:0
            property real startY:0
            property real pull:0
            onPressed:{startX=mouse.x;startY=mouse.y;pull=0;}
            onPositionChanged:{
                var dx=fromRight?startX-mouse.x:mouse.x-startX;
                pull=Math.abs(mouse.y-startY)>Math.max(40,dx)?0:Math.max(0,dx);
            }
            onReleased:{var p=pull;pull=0;if(p>56)os.back();}
            onCanceled:pull=0
            Rectangle {
                width:40; height:40; radius:20; color:Style.surface; border.color:Style.hairline
                visible:edge.pull>12; opacity:Math.min(1,edge.pull/56)
                y:edge.startY-20
                x:edge.fromRight?-Math.min(64,edge.pull*.7):Math.min(64,edge.pull*.7)-24
                Glyph { anchors.centerIn:parent; width:20; name:"chevron-left"; opacity:edge.pull>56?1:.5 }
            }
        }
    }
    Rectangle {
        anchors.fill:parent; z:5; visible:os.sheet!==""; color:Style.scrim
        MouseArea { anchors.fill:parent; onClicked:os.sheet="" }
        Rectangle {
            anchors.bottom:parent.bottom; width:parent.width; height:360; radius:32; color:Style.surface
            MouseArea { anchors.fill:parent }
            Rectangle { width:40;height:4;radius:2;color:Style.subtle;anchors.horizontalCenter:parent.horizontalCenter;y:12 }
            Column {
                y:28; width:parent.width
                TextLabel { x:16;text:"Wi-Fi";size:24;font.weight:Font.DemiBold }
                ListRow { width:parent.width;title:"Attiva Wi-Fi";icon:"wifi";switchControl:true;checked:os.wifi;onToggled:os.changeControl("wifi",value) }
                ListRow { width:parent.width;title:os.previewMode?"Casa-5G":"Reti disponibili";subtitle:os.previewMode?"Connessa · WPA3":"Apri le impostazioni di rete";icon:"lock";value:os.previewMode?"Connessa":"";onClicked:os.settingsRequested("wifi") }
                ListRow { width:parent.width;title:"Tutte le impostazioni Wi-Fi";icon:"chevron-right";onClicked:{os.sheet="";os.openDetail("Connessioni","wifi");} }
            }
        }
    }
    Timer { interval:30000;repeat:true;running:!os.previewMode;onTriggered:{os.timeText=Qt.formatTime(new Date(),"hh:mm");os.dateText=Qt.formatDate(new Date(),"dddd d MMMM");} }
}
