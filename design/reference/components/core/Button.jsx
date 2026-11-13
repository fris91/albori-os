import React from 'react';
import { Icon } from './Icon.jsx';
export function Button({ variant = 'primary', size = 'md', block = false, icon, iconRight, children, className = '', ...rest }) {
  const cls = ['al-reset al-focusable al-btn', 'al-btn--' + variant, size !== 'md' && 'al-btn--' + size, block && 'al-btn--block', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} {...rest}>
      {icon && <Icon name={icon} size={20} />}
      {children}
      {iconRight && <Icon name={iconRight} size={20} />}
    </button>
  );
}
