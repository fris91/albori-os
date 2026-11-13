import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Checkbox({ checked = false, onChange, children, className = '', ...rest }) {
  return (
    <button type="button" role="checkbox" aria-checked={checked} className={'al-reset al-focusable al-choice ' + className} onClick={() => onChange && onChange(!checked)} {...rest}>
      <span className="al-check" aria-checked={checked}><Icon name="check" size={16} strokeWidth={2.5} /></span>
      {children}
    </button>
  );
}
