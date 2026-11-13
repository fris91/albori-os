(() => {
const DS = window.AlboriOSDesignSystem_de9a4c;
const { PhoneFrame, StatusBar, NavBar, Wallpaper, IconButton } = DS;

const DEFAULTS = {
  screen: 'lock', hist: [], themeMode: 'Scuro', accent: undefined, wall: 'alba', textScale: 1, iconStyle: 'auto',
  reduced: false, nav: 'gesture', wifi: true, bt: false, air: false, data: true, torch: false, silent: false,
  saver: false, rot: false, bright: 70, vol: 45, q: '', storeApp: null, sheet: null, upd: 'idle', updPct: 0, stub: 'App',
};
const CONF = {
  lock: { wall: true, anim: 'fade' }, home: { wall: true, anim: 'home' }, drawer: { wall: true, dim: true, anim: 'rise' },
  control: { wall: true, dim: true, anim: 'drop' }, multitask: { wall: true, dim: true, anim: 'home' },
};

function useOS(initial) {
  const [s, setS] = React.useState({ ...DEFAULTS, ...initial });
  const set = (patch) => setS((p) => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }));
  const go = (screen, extra) => setS((p) => (p.screen === screen && !extra ? p : { ...p, ...extra, sheet: null, screen, hist: screen === 'home' || screen === 'lock' ? [] : [...p.hist, p.screen] }));
  const back = () => setS((p) => { const h = p.hist.slice(); const prev = h.pop() || 'home'; return { ...p, sheet: null, screen: prev === 'lock' ? 'home' : prev, hist: h }; });
  const theme = s.themeMode === 'Scuro' ? 'dark' : 'light';
  return { s, set, go, back, theme };
}

function Header({ os, title, large, right }) {
  return (
    <div style={{ padding: '4px 4px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: 48 }}>
        <IconButton icon="arrow-left" label="Indietro" onClick={os.back} />
        <span style={{ font: 'var(--text-title-sm)', flex: 1, marginLeft: 4 }}>{large ? '' : title}</span>
        {right}
      </div>
      {large && <h1 className="kit-h1" style={{ marginLeft: 12 }}>{title}</h1>}
    </div>
  );
}

function Phone({ os: ext, initial, style }) {
  const own = useOS(initial);
  const os = ext || own;
  const { s } = os;
  const Screen = (window.AlboriScreens || {})[s.screen] || window.AlboriScreens.stub;
  const conf = CONF[s.screen] || { anim: 'open' };
  return (
    <PhoneFrame theme={os.theme} accent={s.accent} motion={s.reduced ? 'reduced' : undefined} textScale={s.textScale} style={style} data-screen-label={s.screen}>
      {conf.wall ? <Wallpaper variant={s.wall} dim={conf.dim} /> : null}
      <div className="kit-top" onClick={() => s.screen !== 'lock' && os.go('control')} title="Centro di controllo">
        <StatusBar silent={s.silent} privacy={s.screen === 'privacy' ? 'location' : undefined} />
      </div>
      <div key={s.screen} className={'kit-body kit-anim-' + conf.anim}><Screen os={os} /></div>
      <div className="kit-bottom">
        <NavBar mode={s.nav} onBack={os.back} onHome={() => os.go(s.screen === 'lock' ? 'lock' : 'home')} onRecents={() => os.go('multitask')} />
      </div>
    </PhoneFrame>
  );
}

window.AlboriKit = { DS, useOS, Phone, Header, DEFAULTS };
})();
