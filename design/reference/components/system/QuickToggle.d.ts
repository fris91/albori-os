import * as React from 'react';
/** Control-centre tile: tap body to toggle, tap chevron to open details. */
export interface QuickToggleProps {
  icon: string;
  label: string;
  stateLabel?: string;
  active?: boolean;
  onToggle?: (active: boolean) => void;
  onDetails?: () => void;
  compact?: boolean;
}
export declare function QuickToggle(props: QuickToggleProps): JSX.Element;
