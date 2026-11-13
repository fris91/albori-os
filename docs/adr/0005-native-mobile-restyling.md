# 0005 — Superficie mobile Albori dal design fornito

Data: 2026-11-11. Stato: implementata e verificata nell'anteprima locale.

Il design fornito richiede una composizione diversa da Lomiri. Cambiare palette e icone del launcher laterale non realizza Home, dock, centro di controllo e menu del riferimento.

Si introduce quindi una superficie QtQuick nativa condivisa tra shell mobile e Impostazioni. Lomiri conserva gestione delle app, sessione, autenticazione e modalità desktop. Le schermate sono tradotte dal kit, con componenti comuni e risorse locali. I temi completi AlboriDark/AlboriLight evitano il percorso instabile di override e ripristino delle palette del toolkit Qt5.

La preview interattiva usa gli stessi componenti, con dati dimostrativi separati dai controlli reali. Non si presenta il catalogo del design come uno store operativo né una progress bar come un aggiornamento firmato. La sessione reale continua a delegare autenticazione e operazioni di sistema al backend.

Questo sostituisce la direzione grafica provvisoria giallo/nero dell'incremento iniziale. Dettagli e limiti sono in `docs/RESTYLING.md`.
