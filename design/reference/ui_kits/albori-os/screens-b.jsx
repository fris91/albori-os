(() => {
const { DS, Header } = window.AlboriKit;
const { Icon, Button, AppIcon, SearchField, Slider, ListRow, ListGroup, SectionHeader, Switch, Badge, SegmentedControl, Wallpaper } = DS;

const CATS = [
  ['Rete e dispositivo', [
    ['wifi', 'Connessioni', 'Wi-Fi, rete mobile, Bluetooth'],
    ['sun', 'Schermo', 'Luminosità, sospensione, luce notturna'],
    ['volume-2', 'Suoni e vibrazione', 'Suoneria, volume, non disturbare'],
    ['bell', 'Notifiche', 'Schermata di blocco, anteprime, per app'],
  ]],
  ['Personale', [
    ['palette', 'Personalizzazione', 'Tema, accento, sfondo, icone', 'personal'],
    ['layout-grid', 'App', 'App predefinite, autorizzazioni, spazio'],
    ['eye-off', 'Privacy', 'Fotocamera, microfono, posizione', 'privacy'],
    ['shield-check', 'Sicurezza', 'Blocco schermo, impronta, cifratura'],
  ]],
  ['Sistema', [
    ['battery-medium', 'Batteria', '82% · circa 1 giorno e 4 ore'],
    ['hard-drive', 'Archiviazione', '86 GB liberi su 256 GB'],
    ['accessibility', 'Accessibilità', 'Testo, contrasto, navigazione a pulsanti'],
    ['download', 'Aggiornamenti', 'Albori 1.2 disponibile', 'updates', true],
    ['info', 'Informazioni sul dispositivo', 'Albori 1.1.3 · modello, licenze'],
  ]],
];

function Settings({ os }) {
  const [q, setQ] = React.useState('');
  const f = q.trim().toLowerCase();
  const groups = CATS.map(([g, rows]) => [g, rows.filter((r) => !f || (r[1] + r[2]).toLowerCase().includes(f))]).filter((g) => g[1].length);
  return (
    <div className="kit-scroll">
      <h1 className="kit-h1" style={{ marginTop: 12 }}>Impostazioni</h1>
      <div style={{ padding: '0 16px' }}><SearchField value={q} onChange={setQ} placeholder="Cerca nelle impostazioni" /></div>
      {groups.map(([g, rows]) => (
        <React.Fragment key={g}>
          <SectionHeader>{g}</SectionHeader>
          <ListGroup>
            {rows.map(([icon, title, sub, route, upd]) => (
              <ListRow key={title} icon={icon} title={title} subtitle={sub} chevron trailing={upd ? <Badge count={1} aria-label="1 aggiornamento" /> : null}
                onClick={() => (route ? os.go(route) : os.go('stub', { stub: title }))} />
            ))}
          </ListGroup>
        </React.Fragment>
      ))}
      {!groups.length && <div className="kit-note" style={{ textAlign: 'center', paddingTop: 40 }}>Nessuna impostazione trovata per “{q}”.</div>}
      <div style={{ height: 16 }}></div>
    </div>
  );
}

const LOG = {
  Fotocamera: [['fotocamera', 'Fotocamera', 'Oggi 06:58 · 2 min', 6.97], ['messaggi', 'Messaggi', 'Ieri 21:14 · videochiamata, 12 min', 21.2], ['browser', 'Browser', 'Ieri 18:02 · richiesta negata', 18, true]],
  Microfono: [['messaggi', 'Messaggi', 'Ieri 21:14 · videochiamata, 12 min', 21.2], ['telefono', 'Telefono', 'Ieri 17:40 · chiamata, 4 min', 17.6]],
  Posizione: [['mappe', 'Mappe', 'Oggi 07:10 · posizione precisa, in uso ora', 7.1], ['orologio', 'Orologio', 'Oggi 07:04 · approssimativa (alba)', 7.05], ['browser', 'Browser', 'Ieri 12:31 · richiesta negata', 12.5, true]],
};
const SENSOR_ICON = { Fotocamera: 'camera', Microfono: 'mic', Posizione: 'navigation' };
const LEVELS = ['Solo durante l’uso', 'Chiedi ogni volta', 'Negato'];

function Privacy({ os }) {
  const [tab, setTab] = React.useState('Posizione');
  const [perm, setPerm] = React.useState({ mappe: 0, messaggi: 0, browser: 2, fotocamera: 0, orologio: 1 });
  const [ind, setInd] = React.useState(true);
  const rows = LOG[tab];
  return (
    <div className="kit-scroll">
      <Header os={os} title="Privacy e autorizzazioni" />
      <div style={{ padding: '8px 16px 0' }}>
        <SegmentedControl value={tab} onChange={setTab} options={Object.keys(LOG).map((k) => ({ value: k, label: k, icon: SENSOR_ICON[k] }))} />
        <div style={{ marginTop: 16, font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>{rows.filter((r) => !r[4]).length} app hanno usato: {tab.toLowerCase()} · ultime 24 ore</div>
        <div style={{ position: 'relative', height: 28, marginTop: 8, borderRadius: 'var(--radius-xs)', background: 'var(--surface-1)' }}>
          {rows.map((r) => <span key={r[1]} title={r[2]} style={{ position: 'absolute', top: 4, bottom: 4, left: (((r[3] + 16.8) % 24) / 24 * 100) + '%', width: r[4] ? 2 : 6, borderRadius: 2, background: r[4] ? 'var(--fg-3)' : 'var(--accent)' }}></span>)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--text-mono)', fontSize: 11, color: 'var(--fg-3)', marginTop: 4 }}><span>ieri 07:12</span><span>19:12</span><span>ora</span></div>
      </div>
      <SectionHeader action="Registro completo">Accessi recenti</SectionHeader>
      <ListGroup>
        {rows.map(([app, name, when, , denied]) => (
          <ListRow key={name} leading={<AppIcon app={app} size={32} showLabel={false} variant={os.s.iconStyle} style={{ margin: '0 -4px' }} />} title={name} subtitle={when}
            trailing={denied ? <Badge tone="danger" icon="ban">Negato</Badge> : <Badge tone="neutral" icon="check">Consentito</Badge>} />
        ))}
      </ListGroup>
      <SectionHeader>Autorizzazione: {tab.toLowerCase()}</SectionHeader>
      <ListGroup>
        {Object.keys(perm).slice(0, 4).map((app) => (
          <ListRow key={app} leading={<AppIcon app={app} size={32} showLabel={false} variant={os.s.iconStyle} style={{ margin: '0 -4px' }} />} title={DS.ALBORI_APPS[app].label}
            value={<span style={{ color: perm[app] === 2 ? 'var(--danger)' : 'var(--fg-2)' }}>{LEVELS[perm[app]]}</span>} chevron
            onClick={() => setPerm((p) => ({ ...p, [app]: (p[app] + 1) % 3 }))} />
        ))}
      </ListGroup>
      <SectionHeader>Trasparenza</SectionHeader>
      <ListGroup>
        <ListRow icon="circle-dot" title="Indicatore nella barra di stato" subtitle="Mostra un’icona quando un sensore è in uso" trailing={<Switch checked={ind} onChange={setInd} label="Indicatore" />} />
        <ListRow icon="file-down" title="Esporta registro accessi" subtitle="File CSV, ultimi 30 giorni" chevron onClick={() => {}} />
      </ListGroup>
      <div className="kit-note">Il registro è salvato solo su questo dispositivo e non viene inviato a nessun server. Puoi consultarlo, esportarlo o cancellarlo quando vuoi.</div>
    </div>
  );
}

const ACCENTS = [[undefined, 'Alba', '#F5834A'], ['sole', 'Sole', '#FFD43B'], ['corallo', 'Corallo', '#EE6352'], ['salvia', 'Salvia', '#8FB89A'], ['adriatico', 'Adriatico', '#7FA9D6']];
const WALLS = [['alba', 'Alba'], ['foschia', 'Foschia'], ['ossidiana', 'Tinta unita']];

function Personal({ os }) {
  const s = os.s;
  return (
    <div className="kit-scroll">
      <Header os={os} title="Personalizzazione" />
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ position: 'relative', height: 168, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-1)' }}>
          <Wallpaper variant={s.wall} />
          <div style={{ position: 'absolute', inset: 0, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div><div style={{ font: 'var(--text-overline)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--fg-2)' }}>Anteprima</div><div style={{ font: 'var(--text-body-strong)' }}>Testo di esempio</div><div style={{ font: 'var(--text-footnote)', color: 'var(--fg-2)' }}>Così appariranno titoli e descrizioni.</div></div>
              <Switch checked label="Esempio" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 10 }}>{['telefono', 'messaggi', 'mappe', 'musica'].map((a) => <AppIcon key={a} app={a} size={40} showLabel={false} variant={s.iconStyle} />)}</div>
              <Button size="sm">Azione</Button>
            </div>
          </div>
        </div>
      </div>
      <SectionHeader>Tema</SectionHeader>
      <div style={{ padding: '0 16px' }}><SegmentedControl value={s.themeMode} onChange={(v) => os.set({ themeMode: v })} options={[{ value: 'Chiaro', label: 'Chiaro', icon: 'sun' }, { value: 'Scuro', label: 'Scuro', icon: 'moon' }, { value: 'Auto', label: 'Alba–tramonto', icon: 'sunrise' }]} /></div>
      <SectionHeader>Colore accento</SectionHeader>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
        {ACCENTS.map(([k, n, c]) => (
          <button key={n} type="button" className="al-reset al-focusable" aria-pressed={s.accent === k} onClick={() => os.set({ accent: k })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 60, font: 'var(--text-footnote)', color: s.accent === k ? 'var(--fg-1)' : 'var(--fg-2)' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: c, color: '#101114', boxShadow: s.accent === k ? '0 0 0 2px var(--bg), 0 0 0 4px var(--fg-1)' : 'none' }}>{s.accent === k && <Icon name="check" size={22} strokeWidth={2.5} />}</span>{n}
          </button>
        ))}
      </div>
      <SectionHeader>Sfondo</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, padding: '0 16px' }}>
        {WALLS.map(([k, n]) => (
          <button key={k} type="button" className="al-reset al-focusable" aria-pressed={s.wall === k} onClick={() => os.set({ wall: k })} style={{ font: 'var(--text-footnote)', color: s.wall === k ? 'var(--fg-1)' : 'var(--fg-2)', textAlign: 'center' }}>
            <span style={{ position: 'relative', display: 'block', height: 120, borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 6, boxShadow: s.wall === k ? '0 0 0 2px var(--bg), 0 0 0 4px var(--fg-1)' : 'var(--shadow-1)' }}><Wallpaper variant={k} /></span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{s.wall === k && <Icon name="check" size={14} strokeWidth={2.5} />}{n}</span>
          </button>
        ))}
      </div>
      <SectionHeader>Dimensione del testo</SectionHeader>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px' }}>
        <span style={{ font: '500 13px/1 var(--font-sans)' }}>A</span>
        <div style={{ flex: 1 }}><Slider variant="thin" label="Dimensione del testo" value={Math.round((s.textScale - 0.85) / 0.45 * 100)} onChange={(v) => os.set({ textScale: +(0.85 + Math.round(v / 25) * 25 / 100 * 0.45).toFixed(2) })} /></div>
        <span style={{ font: '500 22px/1 var(--font-sans)' }}>A</span>
      </div>
      <SectionHeader>Stile delle icone</SectionHeader>
      <div style={{ padding: '0 16px' }}><SegmentedControl value={s.iconStyle} onChange={(v) => os.set({ iconStyle: v })} options={[{ value: 'auto', label: 'Materia' }, { value: 'alba', label: 'Accento' }, { value: 'contorno', label: 'Contorno' }]} /></div>
      <SectionHeader>Movimento e navigazione</SectionHeader>
      <ListGroup>
        <ListRow icon="wind" title="Riduci movimento" subtitle="Sostituisce spostamenti e zoom con dissolvenze brevi" trailing={<Switch checked={s.reduced} onChange={(v) => os.set({ reduced: v })} label="Riduci movimento" />} />
        <ListRow icon="navigation-2" title="Navigazione a pulsanti" subtitle="Indietro, Home e App recenti sempre visibili" trailing={<Switch checked={s.nav === 'buttons'} onChange={(v) => os.set({ nav: v ? 'buttons' : 'gesture' })} label="Pulsanti" />} />
      </ListGroup>
      <div style={{ height: 16 }}></div>
    </div>
  );
}

window.AlboriScreens = Object.assign(window.AlboriScreens || {}, { settings: Settings, privacy: Privacy, personal: Personal });
})();
