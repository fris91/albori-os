import QtQuick 2.15
import ".." as UI
Rectangle {
    id:page;property var os
    readonly property string query:search.text.trim().toLowerCase()
    readonly property bool preview:page.os?os.previewMode:true
    readonly property var availableApps:UI.Style.apps.filter(function(a){return page.preview||UI.Style.installed(a.key);})
    readonly property var recentKeys:page.preview?["mappe","messaggi","note","musica"]:(page.os?os.recentApps:[]).filter(function(k){return UI.Style.installed(k);}).slice(0,4)
    readonly property var appResults:page.availableApps.filter(function(a){return a.title.toLowerCase().indexOf(page.query)>=0;})
    readonly property var contacts:page.os&&os.previewMode&&query?["Giulia Ferri","Giorgio Bassi","Marta Colombo","Luca Gini","Paolo Riva"].filter(function(name){return name.toLowerCase().indexOf(page.query)>=0;}):[]
    readonly property var files:page.os&&os.previewMode&&query?[{title:"Giustificativi 2026.pdf",sub:"Documenti · 240 KB"},{title:"Gita al lago.jpg",sub:"Immagini · 3,1 MB"},{title:"Preventivo cucina.ods",sub:"Documenti · 88 KB"}].filter(function(file){return file.title.toLowerCase().indexOf(page.query)>=0;}):[]
    readonly property var settings:query?[{title:"Gesti di navigazione",sub:"Accessibilità",icon:"hand"},{title:"Luminosità",sub:"Schermo",icon:"sun"},{title:"Wi-Fi",sub:"Connessioni",icon:"wifi"}].filter(function(row){return row.title.toLowerCase().indexOf(page.query)>=0;}):[]
    color:UI.Style.bg;radius:24
    Rectangle { width:parent.width-40;x:20;height:1;color:UI.Style.accent }
    UI.SearchField { id:search;x:16;y:16;width:parent.width-32;placeholder:"Cerca app, contatti, file, impostazioni" }
    UI.Scrollable {
        x:0;y:80;width:parent.width;height:parent.height-y
        UI.Section { width:parent.width;title:search.text?"App":"Recenti";visible:search.text===""?page.recentKeys.length>0:page.appResults.length>0 }
        Grid {
            width:parent.width;columns:4;rowSpacing:20
            Repeater {
                model:search.text?page.appResults:page.recentKeys.map(function(k){return UI.Style.app(k);})
                Item { width:page.width/4;height:81;UI.AppButton { anchors.horizontalCenter:parent.horizontalCenter;appKey:modelData.key;onClicked:os.openApp(appKey) } }
            }
        }
        UI.Section { width:parent.width;title:"Tutte le app · A–Z";visible:search.text==="" }
        Grid {
            width:parent.width;columns:4;rowSpacing:20;visible:search.text===""
            Repeater {
                model:page.availableApps.slice().sort(function(a,b){return a.title.localeCompare(b.title);})
                Item { width:page.width/4;height:81;UI.AppButton { anchors.horizontalCenter:parent.horizontalCenter;appKey:modelData.key;onClicked:os.openApp(appKey) } }
            }
        }
        UI.Section { width:parent.width;title:"Contatti";visible:page.contacts.length>0 }
        Repeater { model:page.contacts;UI.ListRow { width:parent.width;title:modelData;icon:"user-round";chevron:true;onClicked:os.openApp("contatti") } }
        UI.Section { width:parent.width;title:"File";visible:page.files.length>0 }
        Repeater { model:page.files;UI.ListRow { width:parent.width;title:modelData.title;subtitle:modelData.sub;icon:"file-text";onClicked:os.openApp("file") } }
        UI.Section { width:parent.width;title:"Impostazioni";visible:page.settings.length>0 }
        Repeater { model:page.settings;UI.ListRow { width:parent.width;title:modelData.title;subtitle:"Impostazioni › "+modelData.sub;icon:modelData.icon;chevron:true;onClicked:os.navigate("settings") } }
        UI.TextLabel { x:16;width:parent.width-32;height:100;text:"Nessun risultato per “"+search.text+"”.\nProva con il nome di un’app, di un contatto o di un file.";size:15;color:UI.Style.muted;wrapMode:Text.Wrap;horizontalAlignment:Text.AlignHCenter;visible:page.query!==""&&!page.appResults.length&&!page.contacts.length&&!page.files.length&&!page.settings.length }
        Item { width:parent.width;height:24 }
    }
}
