# ADR 0001 — Cloni indipendenti, manifest bloccato, patch

Stato: accettato, 2026-11-11.

Conservare cronologia completa e remoto `upstream` per ciascun progetto. Il contenitore Albori versiona manifest, patch, configurazioni e documentazione. I sorgenti clonati restano ignorati; bootstrap li ricostruisce dal commit esatto. Scelta motivata da manutenzione e pubblicazione futura del solo delta, con licenze originali leggibili nei cloni.

Rami: contenitore `albori/main`, cloni `albori/ui-foundation`; `main` e i riferimenti remoti upstream restano disponibili. Commit e pubblicazione richiedono una richiesta dell'utente; la prima pubblicazione privata su `fris91/albori-os` è stata autorizzata il 2026-11-11. Bloccare il push upstream con un push URL locale non valido. Aggiornamenti futuri: salvare il lavoro, esaminare upstream, scegliere commit compatibili, riapplicare patch su un ramo dedicato, eseguire build/test Linux, quindi aggiornare manifest e patch insieme. Mai aggiornare il lock semplicemente perché main è avanzato.

Conseguenza: chi clona il solo contenitore deve lanciare bootstrap con accesso alla rete. Il contenitore non è un fork monolitico di tutto Ubuntu Touch e non produce da solo una ROM. Non sono stati usati submodule, perché le modifiche Albori non hanno ancora commit da poter referenziare.
