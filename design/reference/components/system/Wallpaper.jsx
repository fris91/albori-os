import React from 'react';
/** Abstract dawn wallpaper built from tokens; follows theme and accent. */
export function Wallpaper({ variant = 'alba', dim = false, className = '', ...rest }) {
  return (
    <div className={'al-wall al-wall--' + variant + (dim ? ' al-wall--dim ' : ' ') + className} aria-hidden="true" {...rest}>
      <span className="al-wall__glow"></span>
      <span className="al-wall__sun"></span>
      <span className="al-wall__ground"></span>
    </div>
  );
}
