import React from 'react';
export function ListGroup({ inset = false, children, className = '', ...rest }) {
  return <div className={'al-group ' + (inset ? 'al-group--inset ' : '') + className} {...rest}>{children}</div>;
}
