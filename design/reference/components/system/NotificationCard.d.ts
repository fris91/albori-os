import * as React from 'react';
/** Notification with app, time, title/text; supports grouped stacks and hidden content. */
export interface NotificationCardProps {
  app?: string;
  appName?: string;
  time?: string;
  title?: React.ReactNode;
  text?: React.ReactNode;
  hidden?: boolean;
  count?: number;
  solid?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
export declare function NotificationCard(props: NotificationCardProps): JSX.Element;
