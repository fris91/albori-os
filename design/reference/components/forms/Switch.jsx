import React from 'react';
export function Switch({ checked = false, onChange, label, className = '', ...rest }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label}
      className={'al-reset al-focusable al-switch ' + className}
      onClick={(e) => { e.stopPropagation(); onChange && onChange(!checked); }} {...rest}></button>
  );
}
