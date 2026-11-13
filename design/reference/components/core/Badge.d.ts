import * as React from 'react';
/** Small status label or notification count. */
export interface BadgeProps {
  tone?: 'neutral'|'accent'|'success'|'warning'|'danger'|'info';
  icon?: string;
  count?: number;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
