import * as React from 'react';
/** Uppercase overline heading above a list, with optional action. */
export interface SectionHeaderProps {
  children?: React.ReactNode;
  action?: string;
  onAction?: () => void;
}
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
