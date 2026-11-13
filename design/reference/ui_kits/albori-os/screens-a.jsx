(() => {
const { DS, Header } = window.AlboriKit;
const { Icon, IconButton, Button, AppIcon, ALBORI_APPS, NotificationCard, SearchField, QuickToggle, Slider, ListRow, ListGroup, SectionHeader, Sheet, Switch, Badge } = DS;
const APP_ROUTE = { impostazioni: 'settings', store: 'store', sicurezza: 'privacy' };
const openApp = (os, app) => (APP_ROUTE[app] ? os.go(APP_ROUTE[app]) : os.go('stub', { stub: ALBORI_APPS[app].label }));

function Lock({ os }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 16px 4px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ font: 'var(--text-label)', color: 'var(--fg-2)' }}>martedì 11 novembre</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-clock)', lineHeight: 1, fontWeight: 400, letterSpacing: 'var(--ls-display)', margin: '4px 0 10px' }}>07<span style={{ color: 'var(--accent-text)' }}>:</span>12</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>
          <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="sunrise" size={16} />Alba alle 07:04</span>
          <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="battery-charging" size={16} />82% · in carica</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 28 }}>
        <NotificationCard app="messaggi" time="07:04" title="Giulia Ferri" text="Ci vediamo alle 9 davanti alla stazione? Porto io i biglietti." count={3} />
        <NotificationCard app="calendario" time="06:45" title="Revisione progetto · 09:30" text="Sala Brera, secondo piano" />
        <NotificationCard app="email" time="06:51" count={2} hidden />
      </div>
      <div style={{ flex: 1 }}></div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton icon="flashlight" label="Torcia" variant="glass" size="lg" />
        <button type="button" className="al-reset al-focusable" onClick={() => os.go('home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 8, font: 'var(--text-footnote)', color: 'var(--fg-1)' }}>
          <Icon name="lock" size={18} />Scorri in su per sbloccare
        </button>
        <IconButton icon="camera" label="Fotocamera" variant="glass" size="lg" />
      </div>
    </div>
  );
}

function Home({ os }) {
  const v = os.s.iconStyle;
  const grid = ['calendario', 'mappe', 'galleria', 'email', 'musica', 'note', 'store', 'impostazioni'];
  const dock = ['telefono', 'messaggi', 'browser', 'fotocamera'];
  const ev = (t, n, p) => (<div style={{ display: 'flex', gap: 10 }}><span style={{ font: 'var(--text-label)', color: 'var(--accent-text)', width: 40 }}>{t}</span><span style={{ minWidth: 0 }}><span style={{ display: 'block', font: 'var(--text-label)' }}>{n}</span><span style={{ font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>{p}</span></span></div>);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 16px 4px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 12 }}>
        <div className="kit-glass" style={{ borderRadius: 'var(--radius-lg)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ font: 'var(--text-overline)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--fg-2)' }}>Oggi · mar 11</div>
          {ev('09:30', 'Revisione progetto', 'Sala Brera')}
          {ev('13:00', 'Pranzo con Giulia', 'Via Solferino')}
        </div>
        <div className="kit-glass" style={{ borderRadius: 'var(--radius-lg)', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Icon name="sun" size={22} style={{ color: 'var(--accent-text)' }} />
          <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-display)', lineHeight: 1 }}>9°</div><div style={{ font: 'var(--text-footnote)', color: 'var(--fg-2)', marginTop: 4 }}>Milano · sereno</div></div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', justifyItems: 'center', gap: '20px 0', marginTop: 28 }}>
        {grid.map((a) => <AppIcon key={a} app={a} variant={v} badge={a === 'email' ? 2 : undefined} onClick={() => openApp(os, a)} />)}
      </div>
      <div style={{ flex: 1 }}></div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button type="button" className="al-reset al-focusable al-search al-search--glass" style={{ flex: 1 }} onClick={() => os.go('drawer', { q: '' })}>
          <Icon name="search" size={20} /><span style={{ font: 'var(--text-body-sm)' }}>Cerca nel telefono</span>
        </button>
        <button type="button" className="al-reset al-focusable al-search al-search--glass" style={{ color: 'var(--fg-1)', font: 'var(--text-label)' }} onClick={() => os.go('drawer', { q: '' })}>
          <Icon name="layout-grid" size={18} />Tutte le app
        </button>
      </div>
      <div className="kit-glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', justifyItems: 'center', padding: '12px 0', borderRadius: 'var(--radius-xl)' }}>
        {dock.map((a) => <AppIcon key={a} app={a} variant={v} showLabel={false} badge={a === 'messaggi' ? 3 : undefined} onClick={() => openApp(os, a)} />)}
      </div>
    </div>
  );
}

const CONTACTS = ['Giulia Ferri', 'Giorgio Bassi', 'Marta Colombo', 'Luca Gini', 'Paolo Riva'];
const FILES = [['Giustificativi 2026.pdf', 'Documenti · 240 KB'], ['Gita al lago.jpg', 'Immagini · 3,1 MB'], ['Preventivo cucina.ods', 'Documenti · 88 KB']];
const SETTINGS = [['Gesti di navigazione', 'Accessibilità', 'hand'], ['Giroscopio e sensori', 'Privacy', 'compass'], ['Luminosità', 'Schermo', 'sun'], ['Wi-Fi', 'Connessioni', 'wifi']];

function Drawer({ os }) {
  const q = os.s.q.trim().toLowerCase();
  const v = os.s.iconStyle;
  const keys = Object.keys(ALBORI_APPS).sort();
  const has = (t) => t.toLowerCase().includes(q);
  const apps = keys.filter((k) => has(ALBORI_APPS[k].label));
  const cs = CONTACTS.filter(has), fs = FILES.filter((f) => has(f[0])), ss = SETTINGS.filter((x) => has(x[0]));
  const none = q && !apps.length && !cs.length && !fs.length && !ss.length;
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', marginTop: 4, background: 'var(--bg)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', boxShadow: '0 -1px 0 var(--accent)' }}>
      <div style={{ padding: '16px 16px 8px' }}><SearchField value={os.s.q} onChange={(x) => os.set({ q: x })} placeholder="Cerca app, contatti, file, impostazioni" /></div>
      <div className="kit-scroll">
        {!q && (<React.Fragment>
          <SectionHeader>Recenti</SectionHeader>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', justifyItems: 'center' }}>{['mappe', 'messaggi', 'note', 'musica'].map((a) => <AppIcon key={a} app={a} variant={v} onClick={() => openApp(os, a)} />)}</div>
          <SectionHeader>Tutte le app · A–Z</SectionHeader>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', justifyItems: 'center', gap: '20px 0', paddingBottom: 16 }}>{keys.map((a) => <AppIcon key={a} app={a} variant={v} onClick={() => openApp(os, a)} />)}</div>
        </React.Fragment>)}
        {q && apps.length > 0 && (<React.Fragment><SectionHeader>App</SectionHeader><ListGroup>{apps.map((a) => <ListRow key={a} leading={<AppIcon app={a} size={32} variant={v} showLabel={false} style={{ margin: '0 -4px' }} />} title={ALBORI_APPS[a].label} value="Apri" onClick={() => openApp(os, a)} />)}</ListGroup></React.Fragment>)}
        {q && cs.length > 0 && (<React.Fragment><SectionHeader>Contatti</SectionHeader><ListGroup>{cs.map((c) => <ListRow key={c} leading={<span className="kit-avatar">{c.split(' ').map((w) => w[0]).join('')}</span>} title={c} trailing={<React.Fragment><Icon name="phone" size={20} /><span style={{ width: 12 }}></span><Icon name="message-circle" size={20} /></React.Fragment>} onClick={() => os.go('stub', { stub: 'Contatti' })} />)}</ListGroup></React.Fragment>)}
        {q && fs.length > 0 && (<React.Fragment><SectionHeader>File</SectionHeader><ListGroup>{fs.map((f) => <ListRow key={f[0]} icon="file-text" title={f[0]} subtitle={f[1]} onClick={() => os.go('stub', { stub: 'File' })} />)}</ListGroup></React.Fragment>)}
        {q && ss.length > 0 && (<React.Fragment><SectionHeader>Impostazioni</SectionHeader><ListGroup>{ss.map((x) => <ListRow key={x[0]} icon={x[2]} title={x[0]} subtitle={'Impostazioni › ' + x[1]} chevron onClick={() => os.go('settings')} />)}</ListGroup></React.Fragment>)}
        {none && <div className="kit-note" style={{ textAlign: 'center', paddingTop: 48 }}>Nessun risultato per “{os.s.q}”.<br />Prova con il nome di un’app, di un contatto o di un file.</div>}
      </div>
    </div>
  );
}

function Control({ os }) {
  const s = os.s;
  const t = (k) => (val) => os.set({ [k]: val });
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div className="kit-scroll" style={{ padding: '4px 16px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div><div style={{ font: 'var(--text-title)' }}>07:12</div><div style={{ font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>mar 11 nov · 82%, 1 g 4 h rimanenti</div></div>
          <div style={{ display: 'flex' }}><IconButton icon="pencil" label="Modifica comandi" /><IconButton icon="sliders-horizontal" label="Impostazioni" onClick={() => os.go('settings')} /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <QuickToggle icon="wifi" label="Wi-Fi" stateLabel={s.wifi ? 'Casa-5G' : 'Disattivato'} active={s.wifi} onToggle={t('wifi')} onDetails={() => os.set({ sheet: 'wifi' })} />
          <QuickToggle icon="signal" label="Dati mobili" stateLabel={s.data ? '5G' : 'Disattivati'} active={s.data} onToggle={t('data')} onDetails={() => os.go('settings')} />
          <QuickToggle icon="bluetooth" label="Bluetooth" active={s.bt} onToggle={t('bt')} onDetails={() => os.go('settings')} />
          <QuickToggle icon="plane" label="Modalità aereo" active={s.air} onToggle={t('air')} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 8 }}>
          <QuickToggle compact icon="flashlight" label="Torcia" active={s.torch} onToggle={t('torch')} />
          <QuickToggle compact icon={s.silent ? 'bell-off' : 'bell'} label="Silenzioso" active={s.silent} onToggle={t('silent')} />
          <QuickToggle compact icon="leaf" label="Risparmio" active={s.saver} onToggle={t('saver')} />
          <QuickToggle compact icon="rotate-cw" label="Rotazione" active={s.rot} onToggle={t('rot')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <Slider value={s.bright} onChange={t('bright')} icon="sun" showValue label="Luminosità" />
          <Slider value={s.vol} onChange={t('vol')} icon={s.vol === 0 ? 'volume-x' : 'volume-2'} showValue label="Volume" />
        </div>
        <div style={{ font: 'var(--text-caption)', fontSize: 'var(--fs-caption)', color: 'var(--fg-2)', textAlign: 'center', margin: '10px 0 0' }}>Tocca per attivare · la freccia apre i dettagli</div>
        <SectionHeader action="Cancella tutto" style={{ padding: '16px 0 8px' }}>Notifiche</SectionHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <NotificationCard solid app="messaggi" time="07:04" title="Giulia Ferri" text="Ci vediamo alle 9 davanti alla stazione?" count={3}><Button size="sm" variant="secondary">Rispondi</Button><Button size="sm" variant="ghost">Segna come letto</Button></NotificationCard>
          <NotificationCard solid app="store" time="ieri" title="2 app aggiornate" text="Rondine 4.2, Quaderno 1.9" />
        </div>
      </div>
      {s.sheet === 'wifi' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'var(--surface-scrim)' }} onClick={() => os.set({ sheet: null })}>
          <div className="kit-anim-rise" onClick={(e) => e.stopPropagation()}>
            <Sheet title="Wi-Fi">
              <ListGroup>
                <ListRow icon="wifi" title="Attiva Wi-Fi" trailing={<Switch checked={s.wifi} onChange={t('wifi')} label="Wi-Fi" />} />
                <ListRow icon="lock" title="Casa-5G" subtitle="Connessa · WPA3" trailing={<Badge tone="success" icon="check">Connessa</Badge>} onClick={() => {}} />
                <ListRow icon="lock" title="Studio Colombo" subtitle="Salvata" onClick={() => {}} />
                <ListRow icon="wifi" title="Bar Centrale" subtitle="Aperta · non protetta" onClick={() => {}} />
              </ListGroup>
              <div style={{ padding: '8px 16px 0' }}><Button variant="secondary" block onClick={() => os.go('settings')}>Tutte le impostazioni Wi-Fi</Button></div>
            </Sheet>
          </div>
        </div>
      )}
    </div>
  );
}

window.AlboriScreens = Object.assign(window.AlboriScreens || {}, { lock: Lock, home: Home, drawer: Drawer, control: Control });
})();
