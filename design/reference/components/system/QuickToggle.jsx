import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function QuickToggle({ icon, label, stateLabel, active = false, onToggle, onDetails, compact = false, className = '', ...rest }) {
  const state = stateLabel || (active ? 'Attivo' : 'Disattivato');
  if (compact) {
    return (
      <button type="button" aria-pressed={active} data-active={active} onClick={() => onToggle && onToggle(!active)}
        className={'al-reset al-focusable al-qt al-qt--compact ' + className} {...rest}>
        <Icon name={icon} size={22} />
        <span className="al-qt__label">{label}</span>
      </button>
    );
  }
  return (
    <div className={'al-qt ' + className} data-active={active} {...rest}>
      <button type="button" className="al-reset al-focusable al-qt__main" aria-pressed={active} onClick={() => onToggle && onToggle(!active)}>
        <Icon name={icon} size={22} />
        <span className="al-qt__text">
          <span className="al-qt__label">{label}</span>
          <span className="al-qt__state">{state}</span>
        </span>
      </button>
      {onDetails && (
        <button type="button" className="al-reset al-focusable al-qt__more" aria-label={'Dettagli ' + label} onClick={onDetails}>
          <Icon name="chevron-right" size={18} />
        </button>
      )}
    </div>
  );
}
