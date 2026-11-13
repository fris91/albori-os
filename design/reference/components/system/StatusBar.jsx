import React from 'react';
import { Icon } from '../core/Icon.jsx';
const PRIVACY = { camera: 'camera', mic: 'mic', location: 'navigation' };
export function StatusBar({ time = '07:12', battery = 82, charging = false, privacy, silent = false, className = '', ...rest }) {
  return (
    <div className={'al-status ' + className} {...rest}>
      <span className="al-status__side">{time}{silent && <Icon name="bell-off" size={14} strokeWidth={2} />}</span>
      <span className="al-status__side">
        {privacy && <span className="al-status__privacy" title="In uso"><Icon name={PRIVACY[privacy] || 'circle'} size={12} strokeWidth={2.5} /></span>}
        <Icon name="signal" size={16} strokeWidth={2} />
        <Icon name="wifi" size={16} strokeWidth={2} />
        <Icon name={charging ? 'battery-charging' : battery < 20 ? 'battery-low' : 'battery-medium'} size={20} strokeWidth={1.75} />
        <span className="al-status__batt">{battery}%</span>
      </span>
    </div>
  );
}
