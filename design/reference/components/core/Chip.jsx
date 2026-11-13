import React from 'react';
import { Icon } from './Icon.jsx';
export function Chip({ selected = false, icon, children, className = '', ...rest }) {
  return (
    <button type="button" className={'al-reset al-focusable al-chip ' + className} aria-pressed={selected} {...rest}>
      {selected ? <Icon name="check" size={16} strokeWidth={2.25} /> : icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
}
