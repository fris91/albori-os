import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
export function NavBar({ mode = 'gesture', onBack, onHome, onRecents, className = '', ...rest }) {
  if (mode === 'buttons') {
    return (
      <div className={'al-nav al-nav--buttons ' + className} {...rest}>
        <IconButton icon="chevron-left" label="Indietro" onClick={onBack} />
        <IconButton icon="circle" label="Home" onClick={onHome} />
        <IconButton icon="square" label="App recenti" onClick={onRecents} />
      </div>
    );
  }
  return (
    <div className={'al-nav ' + className} {...rest}>
      <button type="button" className="al-reset al-focusable" aria-label="Home" onClick={onHome} style={{ padding: '12px 24px' }}><span className="al-nav__pill" style={{ display: 'block' }}></span></button>
    </div>
  );
}
