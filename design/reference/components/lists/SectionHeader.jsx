import React from 'react';
export function SectionHeader({ children, action, onAction, className = '', ...rest }) {
  return (
    <div className={'al-section ' + className} {...rest}>
      <span>{children}</span>
      {action && <button type="button" className="al-reset" onClick={onAction}>{action}</button>}
    </div>
  );
}
