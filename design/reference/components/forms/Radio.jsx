import React from 'react';
export function Radio({ checked = false, onChange, children, className = '', ...rest }) {
  return (
    <button type="button" role="radio" aria-checked={checked} className={'al-reset al-focusable al-choice ' + className} onClick={() => onChange && onChange(true)} {...rest}>
      <span className="al-radio" aria-checked={checked}></span>
      {children}
    </button>
  );
}
