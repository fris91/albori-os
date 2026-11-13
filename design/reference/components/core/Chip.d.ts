import * as React from 'react';
/** Filter/category chip with a selected state that adds a check mark. */
export interface ChipProps {
  selected?: boolean;
  icon?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
export declare function Chip(props: ChipProps): JSX.Element;
