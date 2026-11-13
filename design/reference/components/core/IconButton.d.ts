import * as React from 'react';
/** Round 48px icon-only button; always pass `label`. */
export interface IconButtonProps {
  icon: string;
  label: string;
  variant?: 'plain'|'filled'|'glass'|'accent';
  size?: 'md'|'lg';
  disabled?: boolean;
  onClick?: () => void;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
