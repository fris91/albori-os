import QtQuick 2.15
import QtTest 1.2
import "__ALBORI_IMPORT__" as UI

Item {
    id:root;width:390;height:844
    property var surface:null
    Component { id:factory;UI.Surface { width:390;height:844;previewMode:true } }
    SignalSpy { id:launchSpy;target:root.surface;signalName:"launchRequested" }
    TestCase {
        name:"AlboriSurface";when:windowShown
        function initTestCase() {
            Qt.application.organization="Albori";
            Qt.application.domain="albori.local";
        }
        function init() {
            UI.Style.light=false;UI.Style.themeMode="Scuro";UI.Style.accent="#F5834A";UI.Style.iconStyle="auto";
            UI.Style.textScale=1;UI.Style.navigationButtons=false;UI.Style.wallpaper="alba";
            root.surface=createTemporaryObject(factory,root);
            verify(root.surface!==null);tryCompare(root.surface,"pageStatus",Loader.Ready);
            launchSpy.clear();
        }
        function cleanup() { root.surface=null; }
        function test_home_settings_personal_navigation() {
            surface.unlock();tryCompare(surface,"screen","home");
            var app=findChild(surface,"app-impostazioni");verify(app!==null);
            mouseClick(app,app.width/2,app.height/2);
            tryCompare(surface,"screen","settings");
            var row=findChild(surface,"row-Personalizzazione");verify(row!==null);
            mouseClick(row,row.width/2,row.height/2);
            tryCompare(surface,"screen","personal");
            surface.back();compare(surface.screen,"settings");
            surface.showHome();compare(surface.screen,"home");
        }
        function test_drawer_filters_apps() {
            surface.navigate("drawer");tryCompare(surface,"pageStatus",Loader.Ready);
            var input=findChild(surface,"search-input");verify(input!==null);
            input.text="fotocamera";
            tryVerify(function(){return findChild(surface,"app-fotocamera")!==null;});
            tryVerify(function(){var app=findChild(surface,"app-calendario");return app===null||!app.visible;});
        }
        function test_control_changes_preview_state() {
            surface.navigate("control");tryCompare(surface,"pageStatus",Loader.Ready);
            var wifi=findChild(surface,"quick-Wi-Fi");verify(wifi!==null);
            mouseClick(wifi,20,30);compare(surface.wifi,false);
            mouseClick(wifi,20,30);compare(surface.wifi,true);
        }
        function test_live_controls_do_not_fake_enforcement() {
            surface.previewMode=false;
            surface.sessionLocked=false;
            surface.changeControl("wifi",false);
            compare(surface.wifi,true);compare(surface.screen,"detail");
        }
        function test_locked_apps_wait_for_authentication() {
            surface.previewMode=false;
            surface.openApp("fotocamera");
            compare(surface.screen,"auth");compare(surface.pendingApp,"fotocamera");
            compare(launchSpy.count,0);
        }
        function test_navigation_does_not_bypass_authentication() {
            surface.previewMode=false;surface.unlock();compare(surface.screen,"auth");
            surface.showHome();compare(surface.screen,"auth");
            surface.back();compare(surface.screen,"auth");
            surface.navigate("settings");compare(surface.screen,"auth");
        }
        function test_all_screens_both_themes() {
            var routes=["lock","home","drawer","control","settings","personal","privacy","multitask","store","updates","detail"];
            for(var mode=0;mode<2;mode++) {
                UI.Style.light=Boolean(mode);
                for(var i=0;i<routes.length;i++) {
                    surface.navigate(routes[i]);tryCompare(surface,"pageStatus",Loader.Ready);
                    verify(surface.pageItem!==null);
                }
            }
        }
        function test_large_text_and_button_navigation() {
            UI.Style.textScale=1.3;UI.Style.navigationButtons=true;UI.Style.reducedMotion=true;
            surface.navigate("settings");tryCompare(surface,"pageStatus",Loader.Ready);
            verify(findChild(surface,"row-Connessioni")!==null);
            surface.navigate("personal");tryCompare(surface,"pageStatus",Loader.Ready);
            UI.Style.reducedMotion=false;
        }
        function test_small_and_wide_layouts() {
            var routes=["home","drawer","control","settings","personal","privacy"];
            for(var mode=0;mode<2;mode++){
                surface.width=mode?720:320;surface.height=700;
                for(var i=0;i<routes.length;i++){surface.navigate(routes[i]);tryCompare(surface,"pageStatus",Loader.Ready);}
            }
        }
    }
}
