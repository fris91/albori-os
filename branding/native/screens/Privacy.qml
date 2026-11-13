import QtQuick 2.15
import ".." as UI
Item {
    id:page;property var os;property string sensor:"Posizione"
    property var permissions:["Solo durante l’uso","Solo durante l’uso","Negato","Chiedi ogni volta"]
    UI.PageHeader { width:parent.width;title:"Privacy e autorizzazioni";onBack:os.back() }
    UI.Scrollable {
        y:52;width:parent.width;height:parent.height-y
        UI.SegmentedControl { x:16;width:parent.width-32;textSize:13;options:[{title:"Fotocamera",icon:"camera"},{title:"Microfono",icon:"mic"},{title:"Posizione",icon:"navigation"}];current:["Fotocamera","Microfono","Posizione"].indexOf(page.sensor);onChosen:page.sensor=["Fotocamera","Microfono","Posizione"][index] }
        Item { height:16;width:parent.width }
        UI.TextLabel { x:16;width:parent.width-32;text:page.os&&os.previewMode?"3 app hanno usato: "+page.sensor.toLowerCase()+" · ultime 24 ore":"Registro accessi del dispositivo";size:13;color:UI.Style.muted;wrapMode:Text.Wrap }
        Rectangle {
            x:16;width:parent.width-32;height:28;color:UI.Style.surface;radius:6
            Repeater { model:page.os&&os.previewMode?[.13,.46,.8]:[];Rectangle { x:parent.width*modelData;y:4;width:6;height:20;radius:2;color:UI.Style.accent } }
        }
        Item { width:parent.width;height:20;UI.TextLabel { x:16;text:"ieri 07:12";size:11;color:UI.Style.subtle } UI.TextLabel { anchors.right:parent.right;anchors.rightMargin:16;text:"ora";size:11;color:UI.Style.subtle } }
        UI.Section { width:parent.width;title:"Accessi recenti";action:"Registro completo";onClicked:os.openDetail("Registro accessi","security-privacy") }
        Repeater {
            model:page.os&&os.previewMode?[{key:"mappe",when:"Oggi 07:10 · posizione precisa, in uso ora",value:"Consentito"},{key:"orologio",when:"Oggi 07:04 · approssimativa (alba)",value:"Consentito"},{key:"browser",when:"Ieri 12:31 · richiesta negata",value:"Negato"}]:[]
            UI.ListRow { width:parent.width;appKey:modelData.key;title:UI.Style.app(modelData.key).title;subtitle:modelData.when;value:modelData.value }
        }
        UI.TextLabel { x:16;width:parent.width-32;text:"Nessun registro disponibile in questa sessione.";size:15;color:UI.Style.muted;visible:page.os&&!os.previewMode;wrapMode:Text.Wrap }
        UI.Section { width:parent.width;title:"Autorizzazione: "+page.sensor.toLowerCase() }
        Repeater {
            model:["mappe","messaggi","browser","orologio"]
            UI.ListRow {
                width:parent.width;appKey:modelData;title:UI.Style.app(modelData).title;value:page.permissions[index];chevron:true
                onClicked: {
                    if(!os.previewMode){os.settingsRequested("security-privacy");return;}
                    var values=page.permissions.slice();var levels=["Solo durante l’uso","Chiedi ogni volta","Negato"];
                    values[index]=levels[(levels.indexOf(values[index])+1)%3];page.permissions=values;
                }
            }
        }
        UI.Section { width:parent.width;title:"Trasparenza" }
        UI.ListRow { width:parent.width;title:"Indicatore nella barra di stato";subtitle:"Mostra quando un sensore è in uso";icon:"circle-dot";switchControl:true;property bool indicator:true;checked:indicator;onToggled:indicator=value }
        UI.ListRow { width:parent.width;title:"Esporta registro accessi";subtitle:"Consulta i dati prima di esportarli";icon:"file-down";chevron:true;onClicked:os.openDetail("Registro accessi","security-privacy") }
        UI.TextLabel { x:16;width:parent.width-32;height:64;text:page.os&&os.previewMode?"Accessi e autorizzazioni mostrati sono dati dimostrativi del design.":"Le autorizzazioni sono gestite dai servizi del sistema.";size:13;color:UI.Style.muted;wrapMode:Text.Wrap;verticalAlignment:Text.AlignVCenter }
    }
}
