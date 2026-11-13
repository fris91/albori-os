import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Slider({ value = 50, onChange, icon, variant = 'fill', showValue = false, label, className = '', ...rest }) {
  const ref = React.useRef(null);
  const set = (e) => {
    const r = ref.current.getBoundingClientRect();
    const v = Math.round(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * 100);
    onChange && onChange(v);
  };
  const down = (e) => { e.currentTarget.setPointerCapture(e.pointerId); set(e); };
  const move = (e) => { if (e.buttons) set(e); };
  const thin = variant === 'thin';
  return (
    <div ref={ref} role="slider" tabIndex={0} aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}
      className={'al-focusable al-slider ' + (thin ? 'al-slider--thin ' : '') + className}
      onPointerDown={down} onPointerMove={move}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') onChange && onChange(Math.min(100, value + 5)); if (e.key === 'ArrowLeft') onChange && onChange(Math.max(0, value - 5)); }} {...rest}>
      {thin && <span className="al-slider__track"></span>}
      <span className="al-slider__fill" style={{ width: value + '%' }}></span>
      {thin ? <span className="al-slider__thumb" style={{ left: value + '%' }}></span> : icon && <Icon name={icon} size={20} className="al-slider__icon" />}
      {showValue && !thin && <span className="al-slider__value">{value}%</span>}
    </div>
  );
}
