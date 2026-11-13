import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function SegmentedControl({ options = [], value, onChange, className = '', ...rest }) {
  return (
    <div role="radiogroup" className={'al-seg ' + className} {...rest}>
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return (
          <button key={opt.value} type="button" role="radio" aria-checked={opt.value === value} className="al-reset al-focusable al-seg__item" onClick={() => onChange && onChange(opt.value)}>
            {opt.icon && <Icon name={opt.icon} size={16} />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
