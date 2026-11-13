import React from 'react';
export function ProgressBar({ value = 0, label, className = '', ...rest }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <span className={'al-progress ' + className} role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label} {...rest}>
      <span style={{ width: v + '%' }}></span>
    </span>
  );
}
