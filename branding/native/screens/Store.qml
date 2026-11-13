import QtQuick 2.15
import ".." as UI
Item {
    id:page;property var os;property string category:"Tutte";property var selected:null;property var installed:[]
    readonly property var catalog:[
        {title:"Rondine",sub:"Messaggi privati, semplici e veloci",key:"messaggi",cat:"Comunicazione",license:"GPL-3.0",version:"4.2",size:"28 MB"},
        {title:"Quaderno",sub:"Le tue idee, sempre con te",key:"note",cat:"Produttività",license:"GPL-3.0",version:"1.9",size:"14 MB"},
        {title:"Atlante",sub:"Mappe e percorsi anche offline",key:"mappe",cat:"Mappe",license:"GPL-3.0",version:"2.6",size:"46 MB"},
        {title:"Custode",sub:"Password e chiavi sul tuo dispositivo",key:"sicurezza",cat:"Sicurezza",license:"GPL-3.0",version:"1.4",size:"18 MB"}
    ]
    UI.Scrollable {
        anchors.fill:parent;visible:page.selected===null
        UI.TextLabel { x:16;width:parent.width-32;height:62;verticalAlignment:Text.AlignVCenter;text:"Store";size:32;font.weight:Font.DemiBold }
        UI.SearchField { id:search;x:16;width:parent.width-32;placeholder:"Cerca app" }
        Flickable {
            x:16;width:parent.width-16;height:56;contentWidth:chips.width;clip:true;flickableDirection:Flickable.HorizontalFlick
            Row { id:chips;y:12;spacing:8;Repeater { model:["Tutte","Comunicazione","Produttività","Mappe","Sicurezza"];UI.Chip { text:modelData;selected:page.category===modelData;onClicked:page.category=modelData } } }
        }
        UI.Section { width:parent.width;title:"Scelte dalla redazione" }
        Repeater {
            model:page.catalog.filter(function(app){return (page.category==="Tutte"||app.cat===page.category)&&(!search.text||(app.title+app.sub).toLowerCase().indexOf(search.text.toLowerCase())>=0);})
            UI.ListRow { width:parent.width;height:94;appKey:modelData.key;title:modelData.title;subtitle:modelData.sub+"\nOpen source · 2 autorizzazioni";chevron:true;onClicked:page.selected=modelData }
        }
        UI.Section { width:parent.width;title:"Fonti attive" }
        UI.ListRow { width:parent.width;title:"Repository Albori";subtitle:"Catalogo di anteprima del progetto";icon:"package-check";chevron:true;onClicked:os.openDetail("Repository Albori","") }
        UI.ListRow { width:parent.width;title:"Repository della comunità";subtitle:"Applicazioni mantenute dalla comunità";icon:"users-round";chevron:true;onClicked:os.openDetail("Repository della comunità","") }
        UI.ListRow { width:parent.width;title:"Aggiungi una fonte";icon:"plus";onClicked:os.openDetail("Fonti delle applicazioni","") }
        UI.TextLabel { x:16;width:parent.width-32;height:60;text:"Catalogo dimostrativo. Nessun pacchetto viene installato da questa anteprima.";size:13;color:UI.Style.muted;wrapMode:Text.Wrap;verticalAlignment:Text.AlignVCenter }
    }
    Item {
        anchors.fill:parent;visible:page.selected!==null
        UI.PageHeader { width:parent.width;title:"Store";onBack:page.selected=null }
        UI.Scrollable {
            y:52;width:parent.width;height:parent.height-y
            Item { width:parent.width;height:116
                UI.AppButton { x:16;y:20;tileSize:72;showLabel:false;appKey:page.selected?page.selected.key:"store" }
                Column { x:104;y:20;width:parent.width-x-16;spacing:6;UI.TextLabel { width:parent.width;text:page.selected?page.selected.title:"";size:24;font.weight:Font.DemiBold } UI.TextLabel { width:parent.width;text:page.selected?page.selected.cat:"";size:13;color:UI.Style.muted } UI.TextLabel { text:"Open source";size:11;color:UI.Style.accentText } }
            }
            UI.ActionButton {
                x:16;width:parent.width-32;text:page.selected&&page.installed.indexOf(page.selected.key)>=0?"Apri":"Installa · "+(page.selected?page.selected.size:"")
                onClicked: {
                    if(!page.selected)return;
                    if(page.installed.indexOf(page.selected.key)>=0)os.openApp(page.selected.key);
                    else if(os.previewMode)page.installed=page.installed.concat([page.selected.key]);
                }
            }
            UI.Section { width:parent.width;title:"Informazioni" }
            UI.ListRow { width:parent.width;title:"Fonte";value:"Repository Albori" }
            UI.ListRow { width:parent.width;title:"Licenza";value:page.selected?page.selected.license:"" }
            UI.ListRow { width:parent.width;title:"Versione";value:page.selected?page.selected.version:"" }
            UI.Section { width:parent.width;title:"Autorizzazioni richieste" }
            UI.ListRow { width:parent.width;title:"Notifiche";value:"Chiedi ogni volta";icon:"bell" }
            UI.ListRow { width:parent.width;title:"Archiviazione";value:"Solo file scelti";icon:"folder" }
            UI.Section { width:parent.width;title:"Verifiche" }
            UI.ListRow { width:parent.width;title:"Codice sorgente pubblico";subtitle:"Informazione di esempio del catalogo";icon:"code" }
            UI.ListRow { width:parent.width;title:"Firma del pacchetto";subtitle:"Da verificare su un pacchetto reale";icon:"file-check" }
        }
    }
}
