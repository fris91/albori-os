# ADR 0003 — Hardware, desktop e AI

Stato: architettura accettata; implementazione futura, 2026-11-11.

UI QML → API di sessione → servizi separati e non privilegiati. Un solo broker con policy esplicita gestisce eventuali operazioni privilegiate tramite polkit/AppArmor. Nessun codice kernel o credenziale deve entrare nella shell QML.

Hardware: per prima cosa selezionare dispositivo UBports supportato e distinguere kernel mainline da port Halium. Bloccare sorgenti, firmware, configurazione e catena toolchain per quel dispositivo; mantenere recovery e rollback prima di cambiare boot/kernel.

Pacchetti: metapacchetti Debian firmati per componenti di sistema, Click per app confinate dove applicabile; staging, dipendenze e rollback espliciti. Non aggiungere repository esterni o installazioni root dalla UI senza controllo di autorizzazione.

Desktop Linux: servizio di sessione, pairing autenticato, cifratura del trasporto e consenso distinto per clipboard, file e notifiche; revoca immediata e isolamento per utente. Definire un adapter KDE Connect o altro protocollo solo dopo revisione API/licenza. Nessun pairing o invio implementato ora.

AI: inferenza locale in processo separato, modello scelto per licenza e budget RAM/energia del dispositivo, download esplicito e verificato tramite hash. Il locale deve restare utilizzabile senza rete. Gateway remoto disabilitato inizialmente: endpoint e host autorizzati, TLS, segreti nel portachiavi, anteprima del contesto da inviare, consenso per richiesta, timeout e cancellazione; niente cronologia persistente per default.

MCP è un confine verso strumenti e server, distinto dal protocollo di inferenza LLM. Non inoltrare automaticamente tool call del modello: validare schema e autorizzazioni per ogni capacità; operazioni con effetti esterni richiedono conferma. Redigere dati sensibili nei log, non eseguire shell suggerita dal modello, isolare server e trattare i loro contenuti come non affidabili. I file JSON descrivono requisiti e default, non applicano ancora enforcement o collegamenti di rete.
