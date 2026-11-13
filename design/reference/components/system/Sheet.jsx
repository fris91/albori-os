import React from 'react';
export function Sheet({ title, children, className = '', ...rest }) {
  return (
    <div className={'al-sheet ' + className} role="dialog" aria-label={title} {...rest}>
      <span className="al-sheet__grab"></span>
      {title && <div className="al-sheet__title">{title}</div>}
      {children}
    </div>
  );
}
