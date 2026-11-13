(() => {
const { DS, Header } = window.AlboriKit;
const { Icon, IconButton, Button, AppIcon, ALBORI_APPS, SearchField, ListRow, ListGroup, SectionHeader, Switch, Badge, Chip, ProgressBar } = DS;

function Multitask({ os }) {
  const [open, setOpen] = React.useState([['mappe', 'stub'], ['impostazioni', 'settings'], ['messaggi', 'stub']]);
  const cur = 'impostazioni';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
      {open.length ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          {open.map(([app, route]) => (
            <div key={app} style={{ flex: 'none', width: 224, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32 }}>
                <AppIcon app={app} size={28} showLabel={false} variant={os.s.iconStyle} />
                <span style={{ font: 'var(--text-label)', flex: 1 }}>{ALBORI_APPS[app].label}</span>
                {app === cur && <Badge tone="accent" icon="circle-dot">In uso</Badge>}
              </div>
              <button type="button" className="al-reset al-focusable" onClick={() => os.go(route, { stub: ALBORI_APPS[app].label })}
                style={{ height: 440, borderRadius: 'var(--radius-lg)', background: 'var(--bg)', boxShadow: app === cur ? '0 0 0 2px var(--accent)' : 'var(--shadow-1)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
                <span style={{ font: 'var(--text-title-sm)', color: 'var(--fg-1)' }}>{ALBORI_APPS[app].label}</span>
                {[70, 100, 85, 100, 60, 90].map((w, i) => <span key={i} style={{ height: 10, width: w + '%', borderRadius: 5, background: 'var(--surface-2)' }}></span>)}
              </button>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton icon="x" label={'Chiudi ' + ALBORI_APPS[app].label} variant="glass" onClick={() => setOpen((o) => o.filter((x) => x[0] !== app))} />
              </div>
            </div>
          ))}
        </div>
      ) : <div className="kit-note" style={{ textAlign: 'center', color: 'var(--fg-1)' }}>Nessuna app aperta</div>}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        <Button variant="secondary" icon="search" onClick={() => os.go('drawer', { q: '' })}>Cerca</Button>
        <Button variant="secondary" icon="layers" disabled={!open.length} onClick={() => setOpen([])}>Chiudi tutte</Button>
      </div>
    </div>
  );
}

const CATALOG = [
  { id: 'rondine', name: 'Rondine', dev: 'Collettivo Rondine', icon: 'send', cat: 'Comunicazione', desc: 'Messaggi cifrati da un capo all’altro, anche in gruppo.', lic: 'AGPL-3.0', src: 'Repository Albori', perms: [['bell', 'Notifiche'], ['user-round', 'Contatti', 'facoltativa'], ['mic', 'Microfono', 'solo per i vocali']], ver: '4.2.0', size: '38 MB', open: true },
  { id: 'tessera', name: 'Tessera', dev: 'Studio Vetro', icon: 'key-round', cat: 'Sicurezza', desc: 'Gestore di password locale con sincronizzazione a scelta.', lic: 'GPL-3.0', src: 'Repository Albori', perms: [['fingerprint', 'Impronta', 'per sbloccare']], ver: '2.8.1', size: '12 MB', open: true },
  { id: 'sentiero', name: 'Sentiero', dev: 'Alpi Digitali srl', icon: 'mountain', cat: 'Mappe', desc: 'Mappe escursionistiche offline con tracce GPX.', lic: 'Proprietaria', src: 'Sviluppatore verificato', perms: [['navigation', 'Posizione', 'durante l’uso'], ['hard-drive', 'File', 'per le mappe offline']], ver: '6.0.3', size: '94 MB', open: false },
  { id: 'quaderno', name: 'Quaderno', dev: 'Comunità Quaderno', icon: 'book-open', cat: 'Produttività', desc: 'Appunti in Markdown, salvati come semplici file.', lic: 'MIT', src: 'Repository della comunità', perms: [['hard-drive', 'File']], ver: '1.9.0', size: '8 MB', open: true },
];

function Store({ os }) {
  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('Tutte');
  const [inst, setInst] = React.useState({ quaderno: true });
  const app = CATALOG.find((a) => a.id === os.s.storeApp);
  const tile = (a, size) => <AppIcon icon={a.icon} label={a.name} size={size} showLabel={false} variant={os.s.iconStyle} style={{ margin: size < 40 ? '0 -4px' : 0 }} />;
  if (app) {
    const on = inst[app.id];
    const fact = (k, v, i) => (<div style={{ flex: 1, minWidth: 0, padding: '0 12px', borderLeft: i ? '1px solid var(--hairline)' : 0 }}><div style={{ font: 'var(--text-overline)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{k}</div><div style={{ font: 'var(--text-label)', marginTop: 4 }}>{v}</div></div>);
    return (
      <div className="kit-scroll">
        <Header os={{ ...os, back: () => os.set({ storeApp: null }) }} title="" right={<IconButton icon="share-2" label="Condividi" />} />
        <div style={{ display: 'flex', gap: 16, padding: '4px 16px 16px', alignItems: 'center' }}>
          {tile(app, 72)}
          <div style={{ flex: 1, minWidth: 0 }}><div style={{ font: 'var(--text-title)' }}>{app.name}</div><div style={{ font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>{app.dev} · {app.cat}</div></div>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '0 16px' }}>
          <Button block icon={on ? undefined : 'download'} variant={on ? 'secondary' : 'primary'} onClick={() => setInst((p) => ({ ...p, [app.id]: !on }))}>{on ? 'Apri' : 'Installa · ' + app.size}</Button>
          {on && <Button variant="danger" onClick={() => setInst((p) => ({ ...p, [app.id]: false }))}>Disinstalla</Button>}
        </div>
        <div style={{ display: 'flex', margin: '20px 4px 0' }}>{fact('Fonte', app.src)}{fact('Licenza', app.lic, 1)}{fact('Versione', app.ver, 1)}</div>
        <div className="kit-note" style={{ color: 'var(--fg-1)', font: 'var(--text-body-sm)', paddingTop: 20 }}>{app.desc}</div>
        <SectionHeader>Autorizzazioni richieste · {app.perms.length}</SectionHeader>
        <ListGroup>{app.perms.map(([i, n, note]) => <ListRow key={n} icon={i} title={n} value={note} />)}</ListGroup>
        <SectionHeader>Verifiche</SectionHeader>
        <ListGroup>
          <ListRow icon={app.open ? 'code' : 'lock'} title={app.open ? 'Codice sorgente pubblico' : 'Codice sorgente non pubblico'} subtitle={app.open ? 'Compilata da sorgente dal repository' : 'Pacchetto fornito dallo sviluppatore'} trailing={app.open ? <Badge tone="success" icon="check">Verificabile</Badge> : <Badge tone="warning" icon="triangle-alert">Non verificabile</Badge>} />
          <ListRow icon="file-check" title="Firma del pacchetto valida" subtitle="Controllata il 9 nov 2026" />
          <ListRow icon="history" title="Aggiornata il 3 nov 2026" subtitle={'Versione ' + app.ver + ' · correzioni e traduzioni'} chevron onClick={() => {}} />
        </ListGroup>
        <div style={{ height: 16 }}></div>
      </div>
    );
  }
  const f = q.trim().toLowerCase();
  const list = CATALOG.filter((a) => (cat === 'Tutte' || a.cat === cat) && (!f || (a.name + a.desc).toLowerCase().includes(f)));
  return (
    <div className="kit-scroll">
      <h1 className="kit-h1" style={{ marginTop: 12 }}>Store</h1>
      <div style={{ padding: '0 16px' }}><SearchField value={q} onChange={setQ} placeholder="Cerca app" /></div>
      <div className="kit-scroll" style={{ display: 'flex', gap: 8, padding: '12px 16px 0', overflowX: 'auto', flex: 'none' }}>
        {['Tutte', 'Comunicazione', 'Produttività', 'Mappe', 'Sicurezza'].map((c) => <Chip key={c} selected={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
      </div>
      <SectionHeader>Scelte dalla redazione</SectionHeader>
      <ListGroup>
        {list.map((a) => (
          <ListRow key={a.id} leading={tile(a, 48)} title={a.name} onClick={() => os.set({ storeApp: a.id })}
            subtitle={<React.Fragment>{a.desc}<span style={{ display: 'flex', gap: 6, marginTop: 6 }}><Badge icon={a.open ? 'code' : 'lock'}>{a.open ? 'Open source' : 'Proprietaria'}</Badge><Badge>{a.perms.length} {a.perms.length === 1 ? 'autorizzazione' : 'autorizzazioni'}</Badge></span></React.Fragment>}
            trailing={inst[a.id] ? <Badge tone="success" icon="check">Installata</Badge> : <Icon name="chevron-right" size={18} />} />
        ))}
      </ListGroup>
      {!list.length && <div className="kit-note" style={{ textAlign: 'center', paddingTop: 32 }}>Nessuna app trovata.</div>}
      <SectionHeader>Fonti attive</SectionHeader>
      <ListGroup>
        <ListRow icon="package-check" title="Repository Albori" subtitle="Pacchetti compilati e firmati dal progetto" chevron onClick={() => {}} />
        <ListRow icon="users-round" title="Repository della comunità" subtitle="Mantenuto da volontari · revisione pubblica" chevron onClick={() => {}} />
        <ListRow icon="plus" title="Aggiungi una fonte" onClick={() => {}} />
      </ListGroup>
      <div style={{ height: 16 }}></div>
    </div>
  );
}

function Updates({ os }) {
  const { upd, updPct } = os.s;
  const [auto, setAuto] = React.useState(true);
  React.useEffect(() => {
    if (upd !== 'down') return;
    const t = setInterval(() => os.set((p) => (p.updPct >= 100 ? { upd: 'ready' } : { updPct: Math.min(100, p.updPct + 4) })), 180);
    return () => clearInterval(t);
  }, [upd]);
  const li = (t) => <li style={{ margin: '4px 0' }}>{t}</li>;
  return (
    <div className="kit-scroll">
      <Header os={os} title="Aggiornamenti" />
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>Versione installata</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-display)', lineHeight: 1.1 }}>1.1.3</span><span style={{ font: 'var(--text-mono)', color: 'var(--fg-2)' }}>build 26104 · patch 5 ott 2026</span></div>
      </div>
      <div style={{ margin: '20px 16px 0', padding: 16, borderRadius: 'var(--radius-lg)', background: 'var(--surface-1)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><div style={{ font: 'var(--text-title-sm)' }}>Albori 1.2</div><div style={{ font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>1,4 GB · riavvio di circa 4 minuti</div></div>
          <Badge tone="accent" icon="arrow-up">Disponibile</Badge>
        </div>
        {upd === 'idle' && <Button block icon="download" onClick={() => os.set({ upd: 'down', updPct: 0 })}>Scarica e installa</Button>}
        {(upd === 'down' || upd === 'paused') && (<React.Fragment>
          <ProgressBar value={updPct} label="Download" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>
            <span>{upd === 'paused' ? 'In pausa' : 'Download in corso'} · {updPct}% · {(1.4 * updPct / 100).toFixed(1).replace('.', ',')} di 1,4 GB</span>
            <Button size="sm" variant="secondary" icon={upd === 'paused' ? 'play' : 'pause'} onClick={() => os.set({ upd: upd === 'paused' ? 'down' : 'paused' })}>{upd === 'paused' ? 'Riprendi' : 'Pausa'}</Button>
          </div>
        </React.Fragment>)}
        {upd === 'ready' && (<React.Fragment>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', font: 'var(--text-footnote)', color: 'var(--success)' }}><Icon name="file-check" size={16} />Download completato · firma verificata</div>
          <div style={{ display: 'flex', gap: 8 }}><Button block icon="rotate-cw">Riavvia e installa</Button><Button variant="secondary" onClick={() => os.set({ upd: 'idle', updPct: 0 })}>Stanotte</Button></div>
        </React.Fragment>)}
      </div>
      <SectionHeader>Cosa contiene</SectionHeader>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Badge tone="success" icon="shield-check">Sicurezza · 14 correzioni</Badge>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, font: 'var(--text-body-sm)', color: 'var(--fg-1)' }}>{li('Patch di sicurezza di novembre 2026')}{li('2 vulnerabilità critiche nel modem e nel kernel')}{li('Aggiornamento dei certificati di sistema')}</ul>
        </div>
        <div>
          <Badge tone="accent" icon="sparkles">Nuove funzionalità · 3</Badge>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, font: 'var(--text-body-sm)', color: 'var(--fg-1)' }}>{li('Registro accessi esportabile in Privacy')}{li('Tema automatico dall’alba al tramonto')}{li('Ricerca universale anche nei file')}</ul>
        </div>
      </div>
      <SectionHeader>Opzioni</SectionHeader>
      <ListGroup>
        <ListRow icon="shield-check" title="Installa da solo le correzioni di sicurezza" subtitle="Di notte, in carica e con Wi-Fi" trailing={<Switch checked={auto} onChange={setAuto} label="Automatici" />} />
        <ListRow icon="history" title="Cronologia e ripristino" subtitle="Torna alla 1.1.3 entro 7 giorni dall’installazione" chevron onClick={() => {}} />
        <ListRow icon="fingerprint" title="Firma del pacchetto" subtitle={<span style={{ font: 'var(--text-mono)' }}>sha256 9f3c 41ab … e1a7</span>} />
      </ListGroup>
      <div className="kit-note">Ultimo controllo: oggi alle 06:40.</div>
    </div>
  );
}

function Stub({ os }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header os={os} title={os.s.stub} />
      <div className="kit-note" style={{ margin: 'auto', textAlign: 'center', maxWidth: 260 }}>Schermata non inclusa in questo kit.<br />Usa Indietro o il gesto Home per continuare.</div>
    </div>
  );
}

window.AlboriScreens = Object.assign(window.AlboriScreens || {}, { multitask: Multitask, store: Store, updates: Updates, stub: Stub });
})();
