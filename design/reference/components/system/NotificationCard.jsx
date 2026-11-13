import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { AppIcon, ALBORI_APPS } from './AppIcon.jsx';
export function NotificationCard({ app, appName, time, title, text, hidden = false, count, solid = false, onClick, children, className = '', ...rest }) {
  const name = appName || (ALBORI_APPS[app] || {}).label;
  const Tag = onClick ? 'button' : 'div';
  return (
    <div className="al-notif-wrap" style={count > 1 ? { marginBottom: 6 } : undefined}>
      <Tag type={onClick ? 'button' : undefined} onClick={onClick} className={(onClick ? 'al-reset al-focusable ' : '') + 'al-notif ' + (solid ? 'al-notif--solid ' : '') + className} {...rest}>
        <AppIcon app={app} size={36} showLabel={false} />
        <span className="al-notif__body">
          <span className="al-notif__meta">
            <span>{name}</span>
            {count > 1 && <span>· {count}</span>}
            <time>{time}</time>
          </span>
          {hidden ? (
            <span className="al-notif__text al-notif__text--hidden"><Icon name="lock" size={14} strokeWidth={2} />Contenuto nascosto · sblocca per leggere</span>
          ) : (
            <React.Fragment>
              <span className="al-notif__title">{title}</span>
              {text && <span className="al-notif__text">{text}</span>}
            </React.Fragment>
          )}
          {children && <span className="al-notif__actions">{children}</span>}
        </span>
      </Tag>
      {count > 1 && <span className="al-notif__stack"></span>}
    </div>
  );
}
