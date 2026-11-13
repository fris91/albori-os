# Albori OS pre-alpha 0.1

Questa guida separa due risultati diversi:

1. **Pre-alpha desktop/x86_64**: shell e Impostazioni compilate, avviabili su WSL/Linux e adatte a collaudare interfaccia e flussi.
2. **Pre-alpha dispositivo/arm64**: immagine avviabile su un singolo modello di telefono. Richiede un port specifico; non esiste un'immagine universale sicura da installare su qualsiasi Android.

La base tecnica resta Ubuntu Touch/Lomiri. Secondo la documentazione UBports, un port Android combina rootfs Ubuntu Touch, Halium/kernel e blob vendor della versione Android corretta. Per i port moderni si usa normalmente Halium 9 o successivo e, quando compatibile, una Halium GSI.

## Stato minimo della 0.1

La 0.1 può essere etichettata **pre-alpha** quando:

- il workspace riproduce esattamente i commit bloccati in `workspace.lock.json`;
- i test del frontend passano senza errori o warning Albori;
- Lomiri e Lomiri System Settings compilano;
- lock screen, Home, drawer, recenti, centro di controllo e tutti i menu Impostazioni sono navigabili;
- il backend reale non viene sostituito da stato simulato fuori dalla preview;
- versione, licenze, hash delle sorgenti e limiti noti sono inclusi nell'artefatto;
- per un telefono: boot, display/touch, ADB, AppArmor, Wi-Fi, audio, sospensione/riattivazione e spegnimento sono verificati sul modello scelto.

## A. Build pre-alpha desktop verificabile

Prerequisiti già usati su questa macchina: Ubuntu 24.04 in WSL2, Docker Desktop con integrazione WSL e Clickable 8.10 nell'ambiente Python del progetto.

Dal terminale Ubuntu:

```sh
cd /mnt/e/workspace/albori-os
python3 tools/sync_native_surface.py
python3 tools/verify_native_design.py \
  --source /home/fris91/albori-build/sources/lomiri
bash tools/build-shell-incremental-wsl.sh
bash tools/build-settings-wsl.sh
bash tools/run-shell-wsl.sh --smoke
```

Anteprime manuali:

```sh
bash tools/run-design-wsl.sh
bash tools/run-settings-wsl.sh
```

Per fermarle:

```sh
bash tools/run-design-wsl.sh --stop
bash tools/run-settings-wsl.sh --stop
```

Gli output principali sono:

- shell staged: `/home/fris91/albori-build/sources/lomiri/build/x86_64-linux-gnu/lomiri/install`;
- Settings staged: `/home/fris91/albori-build/sources/lomiri-system-settings/build/native/install`;
- rendering UI: `/home/fris91/albori-build/sources/lomiri/build/albori-renders`.

Questi sono artefatti di sviluppo, non un'immagine flashabile.

## B. Pacchetti arm64 di shell e Impostazioni

Prima di creare una ROM completa, produrre e provare i pacchetti Debian arm64 dei due componenti modificati. UBports documenta `sbuild` e `crossbuilder`; `crossbuilder` è consigliato per modifiche non banali e richiede un host Linux con LXD. Per una build riproducibile di rilascio è preferibile anche una build pulita con `sbuild`, che rileva dipendenze mancanti ed esegue `lintian`.

Procedura per ciascun repository debianizzato (`lomiri`, poi `lomiri-system-settings`):

```sh
git clone https://github.com/ubports/crossbuilder.git "$HOME/crossbuilder"
export PATH="$HOME/crossbuilder:$PATH"
crossbuilder setup-lxd

cd /percorso/del/repository
distro=24.04
arch=arm64
crossbuilder --lxd-image="ubuntu:${distro}" \
  --architecture="${arch}" build
```

Non distribuire i pacchetti prima di avere verificato dipendenze, firme, licenze e installazione su un dispositivo Ubuntu Touch di sviluppo. La release/architettura del container deve coincidere con quella del rootfs scelto; `24.04` qui rappresenta il target del progetto e va confermato contro il canale UBports usato dal port.

## C. Immagine pre-alpha per telefono

Serve prima una decisione bloccante: **marca, modello esatto, codename, SoC e versione Android/vendor di partenza**. Poi:

1. verificare sblocco bootloader, sorgenti kernel e disponibilità di un device tree LineageOS compatibile;
2. scegliere la versione Halium corrispondente alla base Android; per nuovi port evitare Halium precedenti alla 9;
3. predisporre su Linux nativo l'ambiente di porting UBports; WSL può restare utile per la UI, ma USB/fastboot, loop devices, LXD e build Android sono più affidabili su Linux nativo;
4. compilare e avviare il kernel/boot del dispositivo seguendo il metodo moderno della guida UBports;
5. combinare kernel, Halium GSI, rootfs Ubuntu Touch e blob vendor corretti;
6. ottenere prima un boot con ADB, poi Lomiri; aggiungere regole udev, profili AppArmor e overlay del dispositivo;
7. integrare i pacchetti Albori arm64 nel rootfs di sviluppo, senza sostituire manualmente file sul telefono;
8. collaudare hardware e sicurezza con una matrice per display, touch, modem, chiamate, SMS, dati, Wi-Fi, Bluetooth, GPS, fotocamere, audio, sensori, sospensione e cifratura;
9. preparare recovery, OTA locale e configurazione UBports Installer solo dopo un percorso di ripristino provato;
10. firmare manifest, pacchetti e immagini di release; pubblicare hash e lista dei problemi noti.

Riferimenti primari:

- <https://docs.ubports.com/en/latest/porting/introduction/Intro.html>
- <https://docs.ubports.com/en/latest/porting/build_and_boot/index.html>
- <https://docs.ubports.com/en/latest/porting/configure_test_fix/>
- <https://docs.ubports.com/en/latest/systemdev/testing-locally.html>

## Limiti della prima pre-alpha

- Store, aggiornamenti OTA, meteo, calendario e dati privacy della preview sono dimostrativi finché non vengono collegati a servizi reali.
- Il fatto che i menu siano completi graficamente non implica che ogni plugin backend sia già implementato.
- “Sicuro al 100%” non è una promessa tecnicamente verificabile. La pre-alpha deve essere descritta come sperimentale, non adatta a dati primari e installabile solo con backup e recovery funzionante.
- Il primo target deve essere un solo dispositivo già ben documentato; supportare più telefoni prima del bring-up completo moltiplica kernel, blob e test.
