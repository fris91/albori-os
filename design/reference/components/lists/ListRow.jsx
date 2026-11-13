import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function ListRow({ icon, leading, title, subtitle, value, chevron = false, trailing, onClick, className = '', ...rest }) {
  const Tag = onClick ? 'button' : 'div';
  const lead = leading || (icon && <Icon name={icon} size={22} />);
  return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick}
      className={(onClick ? 'al-reset al-focusable ' : '') + 'al-row ' + (lead ? 'al-row--icon ' : '') + className} {...rest}>
      {lead && <span className="al-row__lead">{lead}</span>}
      <span className="al-row__body">
        <span className="al-row__title">{title}</span>
        {subtitle && <span className="al-row__sub">{subtitle}</span>}
      </span>
      {(value || trailing || chevron) && (
        <span className="al-row__trail">
          {value}{trailing}
          {chevron && <Icon name="chevron-right" size={18} className="al-row__chev" />}
        </span>
      )}
    </Tag>
  );
}
