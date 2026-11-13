import React from 'react';
export function PhoneFrame({ theme = 'dark', accent, motion, textScale, children, className = '', style, ...rest }) {
  return (
    <div className={'al-phone ' + className} data-theme={theme} data-accent={accent} data-motion={motion}
      style={{ ...(textScale ? { '--text-scale': textScale } : null), ...style }} {...rest}>
      <span className="al-phone__cam"></span>
      <div className="al-phone__screen">{children}</div>
    </div>
  );
}
