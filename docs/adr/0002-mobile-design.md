# ADR 0002 — Linguaggio visivo Albori

Stato: accettato come incremento iniziale, 2026-11-11.

Identità: sole a semicerchio con cinque raggi rettangolari, giallo #FFD43B e nero #101114; font di sistema. Chiarezza, spazio, target tattili ampi e navigazione progressiva ispirano la UI. Nessun asset di altri sistemi incluso.

Shell: mantenere modelli e gesture upstream; cambiare superficie del drawer e splash. Settings: tema SuruDark disponibile nel toolkit, categorie a elenco anche su telefono, margini 2 gu e righe 7 gu. Convergenza desktop e plugin restano gestiti dal codice esistente. I token sono riferimento progettuale; non esiste ancora un generatore che li propaghi a ogni componente.

Questo non completa un design system: palette gialla globale, quick settings, temi chiaro/scuro selezionabili, motion ridotto e revisione completa accessibilità richiedono ulteriori incrementi e prove runtime. Gli snapshot dei test che dipendono da layout/titoli potrebbero richiedere aggiornamento dopo la validazione Linux; non dichiararli superati in base al solo parsing QML.
