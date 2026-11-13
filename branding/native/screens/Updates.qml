import QtQuick 2.15
import ".." as UI
Item {
    id:page;property var os;property string phase:"idle";property int progress:0;property bool automatic:true
    UI.PageHeader { width:parent.width;title:"Aggiornamenti";onBack:os.back() }
    UI.Scrollable {
        y:52;width:parent.width;height:parent.height-y
        Column {
            x:16;width:parent.width-32;spacing:8
            UI.TextLabel { text:"Versione installata";size:13;color:UI.Style.muted }
            Row { spacing:10;Text { text:page.os&&os.previewMode?"1.1.3":"Dev";font.family:UI.Style.display;font.pixelSize:44;color:UI.Style.fg } UI.TextLabel { anchors.baseline:parent.children[0].baseline;text:"Albori OS · anteprima";size:13;color:UI.Style.muted } }
        }
        Item { width:parent.width;height:20 }
        Rectangle {
            x:16;width:parent.width-32;height:page.phase==="idle"?160:176;radius:24;color:UI.Style.surface
            Column {
                x:16;y:16;width:parent.width-32;spacing:12
                Row { width:parent.width;UI.TextLabel { width:parent.width-82;text:"Albori 1.2";size:20;font.weight:Font.DemiBold } UI.TextLabel { text:"Anteprima";size:11;color:UI.Style.accentText } }
                UI.TextLabel { text:"Nuove funzionalità e correzioni di sicurezza";width:parent.width;size:13;color:UI.Style.muted;wrapMode:Text.Wrap }
                UI.ActionButton { width:parent.width;text:page.phase==="idle"?"Prova il download":page.phase==="ready"?"Anteprima completata":page.phase==="paused"?"Riprendi":"Pausa";icon:page.phase==="idle"?"download":"";onClicked:{if(page.phase==="idle"){page.phase="down";page.progress=0;}else if(page.phase==="down")page.phase="paused";else if(page.phase==="paused")page.phase="down";else{page.phase="idle";page.progress=0;}} }
                Rectangle { visible:page.phase!=="idle";width:parent.width;height:6;radius:3;color:UI.Style.surface3;Rectangle { width:parent.width*page.progress/100;height:6;radius:3;color:UI.Style.accent } }
                UI.TextLabel { visible:page.phase!=="idle";text:page.progress+"% · simulazione locale";size:13;color:UI.Style.muted }
            }
        }
        UI.Section { width:parent.width;title:"Cosa contiene" }
        Column { x:16;width:parent.width-32;spacing:12
            UI.TextLabel { text:"Sicurezza";size:13;color:UI.Style.accentText;font.weight:Font.Medium }
            UI.TextLabel { width:parent.width;text:"• Patch di sicurezza del sistema\n• Aggiornamento dei certificati\n• Correzioni dei componenti di base";size:15;wrapMode:Text.Wrap;lineHeight:1.5 }
            UI.TextLabel { text:"Nuove funzionalità";size:13;color:UI.Style.accentText;font.weight:Font.Medium }
            UI.TextLabel { width:parent.width;text:"• Nuova interfaccia Albori\n• Personalizzazione di tema e icone\n• Ricerca e navigazione riprogettate";size:15;wrapMode:Text.Wrap;lineHeight:1.5 }
        }
        UI.Section { width:parent.width;title:"Opzioni" }
        UI.ListRow { width:parent.width;title:"Correzioni di sicurezza automatiche";subtitle:"Di notte, in carica e con Wi-Fi";icon:"shield-check";switchControl:true;checked:page.automatic;onToggled:page.automatic=value }
        UI.ListRow { width:parent.width;title:"Cronologia e ripristino";icon:"history";chevron:true;onClicked:os.openDetail("Cronologia aggiornamenti","system-update") }
        UI.TextLabel { x:16;width:parent.width-32;height:80;text:"Questa anteprima mostra il flusso di aggiornamento: non scarica pacchetti e non riavvia il PC.";size:13;color:UI.Style.muted;wrapMode:Text.Wrap;verticalAlignment:Text.AlignVCenter }
    }
    Timer { interval:180;repeat:true;running:page.phase==="down";onTriggered:{page.progress=Math.min(100,page.progress+4);if(page.progress===100)page.phase="ready";} }
}
