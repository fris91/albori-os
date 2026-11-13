import QtQuick 2.15
import ".." as UI
UI.Scrollable {
    id:page;property var os
    readonly property var groups:[
        {title:"Rete e dispositivo",rows:[
            {icon:"wifi",title:"Connessioni",sub:"Wi-Fi, rete mobile, Bluetooth",plugin:"wifi"},
            {icon:"sun",title:"Schermo",sub:"Luminosità, sospensione, luce notturna",plugin:"brightness"},
            {icon:"volume-2",title:"Suoni e vibrazione",sub:"Suoneria, volume, non disturbare",plugin:"sound"},
            {icon:"bell",title:"Notifiche",sub:"Schermata di blocco, anteprime, per app",plugin:"notifications"}]},
        {title:"Personale",rows:[
            {icon:"palette",title:"Personalizzazione",sub:"Tema, accento, sfondo, icone",route:"personal"},
            {icon:"layout-grid",title:"App",sub:"App predefinite, autorizzazioni, spazio",plugin:"applications"},
            {icon:"eye-off",title:"Privacy",sub:"Fotocamera, microfono, posizione",route:"privacy"},
            {icon:"shield-check",title:"Sicurezza",sub:"Blocco schermo, impronta, cifratura",plugin:"security-privacy"},
            {icon:"user-round",title:"Account",sub:"Account locali e servizi collegati",plugin:"online-accounts"}]},
        {title:"Sistema",rows:[
            {icon:"battery-medium",title:"Batteria",sub:"Consumi e risparmio energetico",plugin:"battery"},
            {icon:"hard-drive",title:"Archiviazione",sub:"Spazio utilizzato, file e applicazioni",plugin:"storage"},
            {icon:"accessibility",title:"Accessibilità",sub:"Testo, contrasto, navigazione e feedback",plugin:"accessibility"},
            {icon:"globe",title:"Lingua e regione",sub:"Italiano, formati e tastiera",plugin:"language"},
            {icon:"clock-4",title:"Data e ora",sub:"Fuso orario e formato dell’orologio",plugin:"time-date"},
            {icon:"refresh-cw",title:"Backup e ripristino",sub:"Dati, configurazione e ripristino",plugin:"backup"},
            {icon:"download",title:"Aggiornamenti",sub:"Sistema e correzioni di sicurezza",route:"updates"},
            {icon:"info",title:"Informazioni sul dispositivo",sub:"Albori OS · modello, licenze",plugin:"about"}]}
    ]
    UI.TextLabel { x:16;width:parent.width-32;height:62;verticalAlignment:Text.AlignVCenter;text:"Impostazioni";size:32;font.weight:Font.DemiBold;font.letterSpacing:-.64 }
    UI.SearchField { id:search;x:16;width:parent.width-32;placeholder:"Cerca nelle impostazioni" }
    Repeater {
        model:page.groups
        Column {
            id:group;width:parent.width
            property var rows:modelData.rows.filter(function(row){return !search.text||(row.title+row.sub).toLowerCase().indexOf(search.text.toLowerCase())>=0;})
            visible:rows.length>0
            UI.Section { width:parent.width;title:modelData.title }
            Repeater {
                model:group.rows
                UI.ListRow { width:parent.width;title:modelData.title;subtitle:modelData.sub;icon:modelData.icon;chevron:true;onClicked:modelData.route?os.navigate(modelData.route):os.openDetail(modelData.title,modelData.plugin) }
            }
        }
    }
    Item { width:parent.width;height:16 }
}
