import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function SearchField({ value, onChange, placeholder = 'Cerca', glass = false, onClear, className = '', style, ...rest }) {
  return (
    <label className={'al-search ' + (glass ? 'al-search--glass ' : '') + className} style={style}>
      <Icon name="search" size={20} />
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange && onChange(e.target.value)} {...rest} />
      {value ? <button type="button" className="al-reset" aria-label="Cancella" onClick={() => (onClear ? onClear() : onChange && onChange(''))}><Icon name="x" size={18} /></button> : null}
    </label>
  );
}
