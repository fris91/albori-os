import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';
/** The 16 system apps: key → Italian label + Lucide glyph. */
export const ALBORI_APPS = {
  telefono: { label: 'Telefono', icon: 'phone' },
  messaggi: { label: 'Messaggi', icon: 'message-circle' },
  browser: { label: 'Browser', icon: 'compass' },
  fotocamera: { label: 'Fotocamera', icon: 'camera' },
  galleria: { label: 'Galleria', icon: 'image' },
  file: { label: 'File', icon: 'folder' },
  impostazioni: { label: 'Impostazioni', icon: 'sliders-horizontal' },
  calendario: { label: 'Calendario', icon: 'calendar-days' },
  orologio: { label: 'Orologio', icon: 'clock-4' },
  mappe: { label: 'Mappe', icon: 'map' },
  contatti: { label: 'Contatti', icon: 'user-round' },
  email: { label: 'Email', icon: 'mail' },
  musica: { label: 'Musica', icon: 'music' },
  note: { label: 'Note', icon: 'notebook-pen' },
  store: { label: 'Store', icon: 'shopping-bag' },
  sicurezza: { label: 'Sicurezza', icon: 'shield-check' },
};
export function AppIcon({ app, icon, label, size = 56, variant = 'auto', showLabel = true, badge, onClick, className = '', style, ...rest }) {
  const def = ALBORI_APPS[app] || {};
  const Tag = onClick ? 'button' : 'span';
  const text = label || def.label;
  return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick} aria-label={!showLabel ? text : undefined}
      className={(onClick ? 'al-reset al-focusable ' : '') + 'al-app ' + (variant !== 'auto' ? 'al-app--' + variant + ' ' : '') + className}
      style={{ width: showLabel ? Math.max(size + 16, 72) : size, ...style }} {...rest}>
      <span style={{ position: 'relative', display: 'flex' }}>
        <span className="al-app__tile" style={{ width: size, height: size }}>
          <Icon name={icon || def.icon || 'circle'} size={Math.round(size * 0.46)} strokeWidth={size < 40 ? 2 : 1.75} />
        </span>
        {badge ? <Badge count={badge} className="al-app__dot" /> : null}
      </span>
      {showLabel && <span className="al-app__label">{text}</span>}
    </Tag>
  );
}
