import QtQuick 2.15
import ".." as UI

Item {
    id: page
    property var os

    function sections(title) {
        var menus = {
            "Connessioni": [
                {title:"Reti", rows:[
                    {icon:"wifi",title:"Wi-Fi",sub:"Casa-5G",key:"wifi"},
                    {icon:"signal",title:"Rete mobile",sub:"5G · SIM principale",detail:"Rete mobile"},
                    {icon:"bluetooth",title:"Bluetooth",sub:"Dispositivi nelle vicinanze",key:"bluetooth"},
                    {icon:"wifi",title:"Hotspot personale",sub:"Condividi la connessione",key:"hotspot"}]},
                {title:"Altre connessioni",rows:[
                    {icon:"plane",title:"Modalità aereo",key:"airplane"},
                    {icon:"signal",title:"NFC",sub:"Pagamenti e dispositivi compatibili",key:"nfc"},
                    {icon:"shield-check",title:"VPN",value:"Non connessa",detail:"VPN"}]}],
            "Rete mobile": [{title:"SIM principale",rows:[
                {icon:"signal",title:"Dati mobili",sub:"Rete preferita 5G",key:"mobileData"},
                {icon:"globe",title:"Roaming dati",value:"Disattivato",detail:"Roaming"},
                {icon:"sliders-horizontal",title:"Tipo di rete preferito",value:"5G/4G",detail:"Rete preferita"},
                {icon:"info",title:"Operatore",value:"Automatico",detail:"Operatore di rete"}]}],
            "Schermo": [{title:"Aspetto e comfort",rows:[
                {icon:"sun",title:"Luminosità automatica",key:"autoBrightness"},
                {icon:"moon",title:"Luce notturna",sub:"Colori più caldi dopo il tramonto",key:"nightLight"},
                {icon:"clock-4",title:"Sospensione",value:"1 minuto",detail:"Sospensione schermo"},
                {icon:"rotate-cw",title:"Rotazione automatica",key:"rotation"}]}],
            "Suoni e vibrazione": [{title:"Comportamento",rows:[
                {icon:"bell",title:"Non disturbare",sub:"Silenzia chiamate e notifiche",key:"doNotDisturb"},
                {icon:"volume-2",title:"Vibrazione e feedback aptico",key:"vibration"},
                {icon:"music",title:"Suoneria",value:"Alba",detail:"Suoneria"},
                {icon:"bell",title:"Suono notifiche",value:"Aurora",detail:"Suono notifiche"}]}],
            "Notifiche": [{title:"Preferenze",rows:[
                {icon:"lock",title:"Anteprime nella schermata di blocco",key:"notificationPreview"},
                {icon:"bell-off",title:"Non disturbare",key:"doNotDisturb"},
                {icon:"layout-grid",title:"Notifiche per applicazione",value:"16 app",detail:"Notifiche app"},
                {icon:"history",title:"Cronologia notifiche",value:"Attiva",detail:"Cronologia notifiche"}]}],
            "App": [{title:"Gestione",rows:[
                {icon:"layout-grid",title:"Tutte le app",value:"16 installate",detail:"Applicazioni installate"},
                {icon:"shield-check",title:"Autorizzazioni",sub:"Controlla accessi e sensori",detail:"Autorizzazioni app"},
                {icon:"globe",title:"App predefinite",sub:"Browser, telefono, messaggi",detail:"App predefinite"},
                {icon:"battery-medium",title:"Uso in background",detail:"Attività in background"}]}],
            "Sicurezza": [{title:"Accesso al dispositivo",rows:[
                {icon:"lock",title:"Blocco schermo",value:"PIN",detail:"Blocco schermo"},
                {icon:"fingerprint",title:"Sblocco biometrico",sub:"Impronta o volto",key:"biometricUnlock"},
                {icon:"shield-check",title:"Cifratura",value:"Attiva",detail:"Cifratura dispositivo"}]},
                {title:"Protezione",rows:[
                    {icon:"package-check",title:"Verifica applicazioni",value:"Attiva",detail:"Integrità app"},
                    {icon:"history",title:"Eventi di sicurezza",detail:"Registro di sicurezza"}]}],
            "Account": [{title:"Sul dispositivo",rows:[
                {icon:"user-round",title:"Lucas",sub:"Account proprietario",detail:"Account locale"},
                {icon:"plus",title:"Aggiungi account",sub:"CalDAV, CardDAV, posta o servizio",detail:"Nuovo account"}]},
                {title:"Sincronizzazione",rows:[{icon:"refresh-cw",title:"Sincronizzazione automatica",value:"Attiva",detail:"Sincronizzazione"}]}],
            "Batteria": [{title:"Stato",rows:[
                {icon:"battery-medium",title:"Livello batteria",value:page.os&&os.battery>=0?os.battery+"%":"—"},
                {icon:"battery-charging",title:"Risparmio energetico",sub:"Riduce le attività in background",key:"saver"},
                {icon:"layout-grid",title:"Utilizzo per applicazione",detail:"Consumi delle app"},
                {icon:"clock-4",title:"Ricarica adattiva",value:"Attiva",detail:"Ricarica"}]}],
            "Archiviazione": [{title:"Spazio",rows:[
                {icon:"hard-drive",title:"Spazio utilizzato",value:"28,4 GB di 128 GB"},
                {icon:"layout-grid",title:"Applicazioni",value:"8,2 GB",detail:"Spazio applicazioni"},
                {icon:"image",title:"Foto e video",value:"11,6 GB",detail:"Contenuti multimediali"},
                {icon:"file-text",title:"Documenti e altri file",value:"3,1 GB",detail:"Documenti"},
                {icon:"refresh-cw",title:"Libera spazio",sub:"File temporanei e cache",detail:"Pulizia spazio"}]}],
            "Accessibilità": [{title:"Visualizzazione",rows:[
                {icon:"type",title:"Dimensione testo",value:"Predefinita",detail:"Dimensione testo"},
                {icon:"eye-off",title:"Contrasto elevato",key:"highContrast"},
                {icon:"sun",title:"Riduci animazioni",key:"styleReducedMotion"}]},
                {title:"Interazione",rows:[
                    {icon:"hand",title:"Navigazione a pulsanti",key:"styleNavigationButtons"},
                    {icon:"volume-2",title:"Lettore schermo",value:"Disattivato",detail:"Lettore schermo"}]}],
            "Lingua e regione": [{title:"Preferenze",rows:[
                {icon:"globe",title:"Lingua del sistema",value:"Italiano",detail:"Lingue"},
                {icon:"map",title:"Regione",value:"Italia",detail:"Regione"},
                {icon:"type",title:"Tastiera",value:"Italiano",detail:"Tastiere"},
                {icon:"clock-4",title:"Formato regionale",value:"Italia",detail:"Formati"}]}],
            "Data e ora": [{title:"Orologio",rows:[
                {icon:"clock-4",title:"Data e ora automatiche",value:"Rete",detail:"Ora automatica"},
                {icon:"globe",title:"Fuso orario",value:"Europa/Roma",detail:"Fuso orario"},
                {icon:"clock-4",title:"Formato 24 ore",value:"Attivo",detail:"Formato ora"}]}],
            "Backup e ripristino": [{title:"Backup",rows:[
                {icon:"refresh-cw",title:"Backup automatico",value:"Non configurato",detail:"Configura backup"},
                {icon:"file-check",title:"Esporta configurazione",detail:"Esporta backup"},
                {icon:"history",title:"Ripristina da backup",detail:"Ripristina"}]},
                {title:"Ripristino",rows:[{icon:"refresh-cw",title:"Ripristino dati di fabbrica",sub:"Cancella tutti i dati dal dispositivo",detail:"Conferma ripristino"}]}],
            "Informazioni sul dispositivo": [{title:"Albori OS",rows:[
                {icon:"sunrise",title:"Versione",value:"Pre-alpha 0.1"},
                {icon:"code",title:"Base di sistema",value:"Ubuntu Touch / Lomiri"},
                {icon:"shield-check",title:"Patch di sicurezza",value:"Build di sviluppo"},
                {icon:"info",title:"Licenze open source",detail:"Licenze"},
                {icon:"code",title:"Informazioni build",value:"albori-dev",detail:"Dettagli build"}]}]
        }
        return menus[title] || [{title:"Opzioni",rows:[
            {icon:"info",title:title,sub:"Configurazione disponibile in Albori OS"},
            {icon:"sliders-horizontal",title:"Preferenze",detail:"Preferenze · "+title},
            {icon:"history",title:"Attività recente",detail:"Attività · "+title}]}]
    }

    function checked(key) {
        if (key === "styleReducedMotion") return UI.Style.reducedMotion
        if (key === "styleNavigationButtons") return UI.Style.navigationButtons
        return !!(page.os && key && os[key] === true)
    }
    function toggle(key,value) {
        if (key === "styleReducedMotion") { UI.Style.reducedMotion=value; return }
        if (key === "styleNavigationButtons") { UI.Style.navigationButtons=value; return }
        os.changeControl(key,value)
    }

    UI.PageHeader { width: parent.width; title: page.os ? os.detailTitle : ""; onBack: os.back() }
    UI.Scrollable {
        y: 52; width: parent.width; height: parent.height-y
        UI.Section { width:parent.width; title:"Luminosità"; visible:page.os&&os.detailTitle==="Schermo" }
        UI.ValueSlider { x:16; width:parent.width-32; visible:page.os&&os.detailTitle==="Schermo"; value:page.os?os.brightness:70; onMoved:os.changeControl("brightness",value) }
        UI.Section { width:parent.width; title:"Volume multimediale"; visible:page.os&&os.detailTitle==="Suoni e vibrazione" }
        UI.ValueSlider { x:16; width:parent.width-32; visible:page.os&&os.detailTitle==="Suoni e vibrazione"; value:page.os?os.volume:45; icon:"volume-2"; label:"Volume"; onMoved:os.changeControl("volume",value) }
        Repeater {
            model: page.os ? page.sections(os.detailTitle) : []
            Column {
                width: parent.width
                UI.Section { width:parent.width; title:modelData.title }
                Repeater {
                    model: modelData.rows
                    UI.ListRow {
                        width:parent.width; title:modelData.title; subtitle:modelData.sub||""; icon:modelData.icon||""
                        value:modelData.value||""; switchControl:!!modelData.key; checked:page.checked(modelData.key)
                        chevron:!!modelData.detail
                        onToggled: page.toggle(modelData.key,value)
                        onClicked: if(modelData.detail) os.openDetail(modelData.detail,os.selectedApp)
                    }
                }
            }
        }
        UI.ActionButton { x:16; width:parent.width-32; visible:page.os&&!os.previewMode&&os.selectedApp!==""; text:"Apri controllo nativo"; primary:false; onClicked:os.settingsRequested(os.selectedApp) }
        Item { width:parent.width; height:20 }
    }
}
