# Restyling nativo Albori

Il riferimento visivo è il pacchetto **Albori OS Design System.zip** fornito dall'utente: `design/reference/` ne conserva i file. I documenti e gli script allegati sono materiale di riferimento, non istruzioni operative o skill installate.

Il primo intervento modificava asset e palette mantenendo i menu Lomiri. Questo incremento sostituisce la presentazione mobile con una superficie QtQuick nativa, definita in `branding/native/Surface.qml` e integrata in `lomiri/qml/Shell.qml`. Il desktop Lomiri e i servizi di sessione rimangono il backend. Il menu principale dell'app Impostazioni usa la stessa superficie, senza duplicare le barre del sistema.

| Schermata del kit | Implementazione QML | Elementi ripresi |
| --- | --- | --- |
| Blocco | `screens/Lock.qml` | Bodoni Moda, data, notifiche a schede, azioni inferiori |
| Home | `screens/Home.qml` | Widget calendario/meteo, griglia 4 colonne, ricerca, dock a 4 app |
| Tutte le app | `screens/Drawer.qml` | Ricerca, recenti, griglia alfabetica, sezioni dei risultati |
| Centro di controllo | `screens/Control.qml` | Riquadri 2×2, comandi compatti, cursori, notifiche e azioni |
| Impostazioni | `screens/Settings.qml` | Titolo 32px, ricerca, gruppi a elenco, icone lineari e divisori |
| Personalizzazione | `screens/Personal.qml` | Anteprima, temi, accenti, sfondi, testo, icone e navigazione |
| Privacy | `screens/Privacy.qml` | Selettore sensori, cronologia, righe autorizzazioni |
| Multitasking | `screens/Multitask.qml` | Schede orizzontali, app in uso, chiusura e ricerca |
| Store | `screens/Store.qml` | Ricerca, categorie, catalogo, dettaglio app e autorizzazioni |
| Aggiornamenti | `screens/Updates.qml` | Versione, scheda aggiornamento, avanzamento, novità e opzioni |

Le sottopagine assenti dal kit sono state completate in `Detail.qml` con sezioni Albori per connettività, schermo, audio, notifiche, app, sicurezza, account, batteria, archiviazione, accessibilità, lingua, data/ora, backup e informazioni di sistema. In anteprima i controlli usano stato dimostrativo; nella sessione reale il bridge continua a delegare ai plugin e ai servizi di sistema, che restano la fonte autorevole.

## Materiali e composizione

- Ossidiana `#101114`, grafite `#1B1D22`, porcellana `#F5F4F0`, Alba `#F5834A`; varianti chiare e colori semantici dai token originali.
- Geist 400/500/600 e Bodoni Moda 400 in istanze statiche locali, adatte a Qt5; originali variabili e licenze OFL conservati.
- Lucide **0.460.0**, come nel kit: vettori locali, stessa associazione tra app e pittogramma. Nessuna dipendenza da CDN durante l'uso.
- Icone 56px con raggio 28%, margini 16px, righe da almeno 56px, superfici da 24/32px, pulsanti a pillola.
- Sfondo disegnato dai token tramite Canvas statico, adattivo anche alle anteprime piccole. Si ridisegna su cambi di tema o dimensioni, non in un ciclo continuo.
- Il renderer software usa superfici traslucide; il backdrop blur CSS non viene riprodotto. Nell'anteprima di personalizzazione lo sfondo è attenuato per mantenere il testo leggibile.

## Perimetro funzionale

L'anteprima è un frontend interattivo, non una ROM. I dati di esempio restano confinati a `previewMode`. Nella shell installata, Home incorpora i menu reali di `ayatana-indicator-sound` e `ayatana-indicator-datetime`, mantenendo modelli e azioni D-Bus originali per player, calendario e appuntamenti. Il riquadro Meteo apre `lomiri-weather-app` e non mostra temperatura o località inventate; diventerà un widget solo con un provider reale. Store e aggiornamenti non sono ancora pronti per la ROM: non installano pacchetti, non verificano firme e non eseguono OTA.

Nella shell integrata l'apertura delle applicazioni usa `activateApplication`, e lo sblocco resta controllato dal greeter. Home, Indietro e apertura di app non possono superare lo stato di sessione bloccata. Il tema Auto segue il tema della sessione; la preview dispone di uno stato diurno di esempio. Nessuna geolocalizzazione viene richiesta per calcolare alba o tramonto.

## Avvio sul PC

Da PowerShell, con Docker Desktop e Ubuntu-24.04 attivi:

```powershell
wsl -d Ubuntu-24.04 -- bash /mnt/e/workspace/albori-os/tools/run-design-wsl.sh
```

La finestra **Albori OS · Anteprima nativa** parte dal blocco schermo. Toccare la scritta di sblocco o trascinare verso l'alto, poi aprire Impostazioni dalla Home. La barra superiore apre il centro di controllo. La pillola inferiore torna alla Home; tenerla premuta apre le app recenti. Nella personalizzazione è disponibile anche la navigazione a tre pulsanti.

Per chiudere soltanto questa anteprima:

```powershell
wsl -d Ubuntu-24.04 -- bash /mnt/e/workspace/albori-os/tools/run-design-wsl.sh --stop
```

Il container è limitato a 2 CPU e 2 GiB. Il profilo della preview vive nel container temporaneo; nella sessione installata le preferenze usano la configurazione dell'utente.

## Riproduzione e verifica

Il bootstrap del workspace applica le patch complete, inclusi frontend e risorse. Per modificare i materiali autoritativi in `branding/`, usare `tools/sync_native_surface.py`, rivedere i nuovi file nei cloni e riesportare le patch. `tools/import_design_assets.py` richiede il tarball ufficiale `lucide-static-0.460.0.tgz`; `tools/export_native_palettes.py` traduce i token CSS. Le istanze statiche dei font sono riproducibili con `tools/instance_design_fonts.py` e fontTools.

Su WSL:

```sh
bash /mnt/e/workspace/albori-os/tools/build-shell-incremental-wsl.sh
bash /mnt/e/workspace/albori-os/tools/build-settings-wsl.sh
python3 /mnt/e/workspace/albori-os/tools/verify_native_design.py --source ~/albori-build/sources/lomiri
bash /mnt/e/workspace/albori-os/tools/run-shell-wsl.sh --smoke
python3 /mnt/e/workspace/albori-os/tools/verify_shell_surface.py --source ~/albori-build/sources/lomiri
python3 /mnt/e/workspace/albori-os/tools/render_native_surface.py --source ~/albori-build/sources/lomiri
```

Le immagini in `docs/previews/` sono render della UI QML eseguita su Qt5, non immagini del mock React. `albori-integrated-settings.png` è catturata dalla superficie caricata nella shell con i mock upstream. Le prove native e quelle backend sono separate: il fixture upstream mantiene la presentazione precedente per le regressioni dei servizi; il suo pulsante manuale Load shell abilita invece la nuova UI.

L'avvio di una sessione completa su telefono, l'autenticazione su hardware e le prestazioni grafiche del dispositivo restano da qualificare. I risultati del PC non sono un benchmark del futuro sistema operativo.
