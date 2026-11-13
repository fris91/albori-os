import React from 'react';
const LUCIDE_URL = 'https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js';
const subs = new Set();
let started = false;
function ensureLucide() {
  if (started || typeof document === 'undefined') return;
  started = true;
  const done = () => subs.forEach((f) => f());
  if (window.lucide && window.lucide.icons) return done();
  const s = document.createElement('script');
  s.src = LUCIDE_URL; s.onload = done;
  document.head.appendChild(s);
}
/** Lucide glyph, 1.75 stroke, inherits currentColor. */
export function Icon({ name, size = 24, strokeWidth = 1.75, className = '', style, ...rest }) {
  const [, tick] = React.useState(0);
  React.useEffect(() => {
    if (window.lucide && window.lucide.icons) return;
    const f = () => tick((n) => n + 1);
    subs.add(f); ensureLucide();
    return () => subs.delete(f);
  }, []);
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  const key = String(name).replace(/(^|-)([a-z0-9])/g, (_, a, c) => c.toUpperCase());
  let node = lib && lib[key];
  if (node && node[0] === 'svg') node = node[2];
  return (
    <span className={'al-icon ' + className} style={{ width: size, height: size, ...style }} aria-hidden="true" {...rest}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {node && node.map(([tag, attrs], i) => React.createElement(tag, { ...attrs, key: i }))}
      </svg>
    </span>
  );
}
