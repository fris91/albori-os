import QtQuick 2.12
import QtTest 1.2
import Lomiri.Components 1.3
import "__ALBORI_IMPORT__" as Albori
import AlboriDark 1.3 as Dark
import AlboriLight 1.3 as Light

StyledItem {
    id: root
    width: 390
    height: 844
    property bool light: false
    theme.name: light ? "AlboriLight" : "AlboriDark"
    Image { id: asset; width: 56; height: 56 }
    TestCase {
        name: "AlboriDesign"
        when: windowShown
        function test_palette() {
            root.light = false;
            compare(String(root.theme.palette.normal.background), "#101114");
            compare(String(root.theme.palette.normal.activity), "#f5834a");
            root.light = true;
            compare(String(root.theme.palette.normal.background), "#f5f4f0");
            compare(String(root.theme.palette.normal.backgroundText), "#101114");
            root.light = false;
        }
        function test_fonts() {
            tryCompare(Albori.Theme.sansLoader, "status", FontLoader.Ready);
            tryCompare(Albori.Theme.displayLoader, "status", FontLoader.Ready);
            verify(Albori.Theme.sansFont.indexOf("Geist") >= 0);
            verify(Albori.Theme.displayFont.indexOf("Bodoni") >= 0);
        }
        function test_iconMapping() {
            verify(String(Albori.Theme.appIcon("lomiri-dialer-app", "original.svg", false)).indexOf("telefono-dark.svg") >= 0);
            compare(Albori.Theme.appIcon("unknown-vendor-app", "original.svg", false), "original.svg");
        }
        function test_assets() {
            var apps = "telefono messaggi browser fotocamera galleria file impostazioni calendario orologio mappe contatti email musica note store sicurezza".split(" ");
            for (var mode = 0; mode < 2; ++mode) {
                for (var i = 0; i < apps.length; ++i) {
                    asset.source = Albori.Theme.appIcon(apps[i], "missing.svg", Boolean(mode));
                    tryCompare(asset, "status", Image.Ready);
                }
                asset.source = Qt.resolvedUrl("__ALBORI_IMPORT__/assets/wallpaper-" + (mode ? "light" : "dark") + ".svg");
                tryCompare(asset, "status", Image.Ready);
            }
        }
    }
}
