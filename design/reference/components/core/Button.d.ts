import * as React from 'react';
/** Pill button for actions; one `primary` per screen at most. */
export interface ButtonProps {
  variant?: 'primary'|'secondary'|'outline'|'ghost'|'danger';
  size?: 'sm'|'md'|'lg';
  block?: boolean;
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
