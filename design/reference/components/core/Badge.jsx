import React from 'react';
import { Icon } from './Icon.jsx';
export function Badge({ tone = 'neutral', icon, count, children, className = '', ...rest }) {
  const isCount = count !== undefined;
  const cls = ['al-badge', isCount ? 'al-badge--count' : tone !== 'neutral' && 'al-badge--' + tone, className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {icon && !isCount && <Icon name={icon} size={12} strokeWidth={2.25} />}
      {isCount ? count : children}
    </span>
  );
}
