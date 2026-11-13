import * as React from 'react';
/** Lucide line glyph (1.75 stroke) that inherits text colour; use for every UI icon. */
export interface IconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
