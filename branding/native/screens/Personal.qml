import QtQuick 2.15
import ".." as UI
Item {
    id:page;property var os
    UI.PageHeader { id:header;width:parent.width;title:"Personalizzazione";onBack:os.back() }
    UI.Scrollable {
        y:52;width:parent.width;height:parent.height-y
        Item {
            x:16;width:parent.width-32;height:184
            Rectangle { y:8;width:parent.width;height:168;radius:24;clip:true;color:UI.Style.bg;border.color:UI.Style.hairline
                UI.Wallpaper { anchors.fill:parent;cornerRadius:24 }
                Rectangle { anchors.fill:parent;radius:24;color:UI.Style.scrim;opacity:.7 }
                Column { x:16;y:16;spacing:4;UI.TextLabel { text:"ANTEPRIMA";size:11;color:UI.Style.muted } UI.TextLabel { text:"Testo di esempio";font.weight:Font.Medium } UI.TextLabel { text:"Così appariranno titoli e descrizioni.";size:13;color:UI.Style.muted } }
                Row { x:16;anchors.bottom:parent.bottom;anchors.bottomMargin:16;spacing:10;Repeater { model:["telefono","messaggi","mappe","musica"];UI.AppButton { appKey:modelData;tileSize:40;showLabel:false } } }
            }
        }
        UI.Section { width:parent.width;title:"Tema" }
        UI.SegmentedControl { x:16;width:parent.width-32;options:[{title:"Chiaro",icon:"sun"},{title:"Scuro",icon:"moon"},{title:"Auto",icon:"sunrise"}];current:["Chiaro","Scuro","Auto"].indexOf(UI.Style.themeMode);onChosen:UI.Style.chooseTheme(["Chiaro","Scuro","Auto"][index],os.systemLight) }
        UI.Section { width:parent.width;title:"Colore accento" }
        Row {
            x:16;width:parent.width-32;spacing:(width-5*56)/4
            Repeater { model:[{title:"Alba",color:"#F5834A"},{title:"Sole",color:"#FFD43B"},{title:"Corallo",color:"#EE6352"},{title:"Salvia",color:"#8FB89A"},{title:"Adriatico",color:"#7FA9D6"}]
                Item { width:56;height:76;Rectangle { width:48;height:48;radius:24;anchors.horizontalCenter:parent.horizontalCenter;color:modelData.color;border.width:UI.Style.accent.toString().toLowerCase()===modelData.color.toLowerCase()?2:0;border.color:UI.Style.fg;UI.Glyph { anchors.centerIn:parent;name:"check";width:22;inverse:!UI.Style.light;visible:parent.border.width>0 } MouseArea { anchors.fill:parent;onClicked:UI.Style.accent=modelData.color } } UI.TextLabel { y:54;width:parent.width;text:modelData.title;size:11;color:UI.Style.muted;horizontalAlignment:Text.AlignHCenter } }
            }
        }
        UI.Section { width:parent.width;title:"Sfondo" }
        Row {
            x:16;width:parent.width-32;spacing:8
            Repeater { model:[{key:"alba",title:"Alba"},{key:"foschia",title:"Foschia"},{key:"ossidiana",title:"Tinta unita"}]
                Item { width:(parent.width-16)/3;height:148
                    Rectangle { width:parent.width;height:120;radius:16;color:UI.Style.bg;clip:true;border.width:UI.Style.wallpaper===modelData.key?2:1;border.color:UI.Style.wallpaper===modelData.key?UI.Style.accent:UI.Style.hairline
                        UI.Wallpaper { anchors.fill:parent;anchors.margins:2;cornerRadius:14;variant:modelData.key }
                        MouseArea { anchors.fill:parent;onClicked:UI.Style.wallpaper=modelData.key }
                    }
                    UI.TextLabel { y:128;width:parent.width;text:modelData.title;size:13;horizontalAlignment:Text.AlignHCenter }
                }
            }
        }
        UI.Section { width:parent.width;title:"Dimensione del testo" }
        Item { x:16;width:parent.width-32;height:32
            UI.TextLabel { anchors.left:parent.left;anchors.verticalCenter:parent.verticalCenter;text:"A";size:13 }
            UI.ValueSlider { x:28;width:parent.width-60;thin:true;value:(UI.Style.textScale-.85)/.45*100;label:"Dimensione testo";onMoved:UI.Style.textScale=.85+Math.round(value/25)*.1125 }
            UI.TextLabel { anchors.right:parent.right;anchors.verticalCenter:parent.verticalCenter;text:"A";size:22 }
        }
        UI.Section { width:parent.width;title:"Stile delle icone" }
        UI.SegmentedControl { x:16;width:parent.width-32;options:["Materia","Accento","Contorno"];current:["auto","alba","contorno"].indexOf(UI.Style.iconStyle);onChosen:UI.Style.iconStyle=["auto","alba","contorno"][index] }
        UI.Section { width:parent.width;title:"Movimento e navigazione" }
        UI.ListRow { width:parent.width;title:"Riduci movimento";subtitle:"Dissolvenze brevi al posto di spostamenti e zoom";icon:"wind";switchControl:true;checked:UI.Style.reducedMotion;onToggled:UI.Style.reducedMotion=value }
        UI.ListRow { width:parent.width;title:"Navigazione a pulsanti";subtitle:"Indietro, Home e App recenti sempre visibili";icon:"navigation-2";switchControl:true;checked:UI.Style.navigationButtons;onToggled:UI.Style.navigationButtons=value }
        Item { width:parent.width;height:16 }
    }
}
