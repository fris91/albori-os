import React from 'react';
import { Icon } from './Icon.jsx';
export function IconButton({ icon, label, variant = 'plain', size = 'md', className = '', ...rest }) {
  const cls = ['al-reset al-focusable al-iconbtn', variant !== 'plain' && 'al-iconbtn--' + variant, size === 'lg' && 'al-iconbtn--lg', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={size === 'lg' ? 26 : 22} />
    </button>
  );
}
