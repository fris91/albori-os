import * as React from 'react';
/** 2–4 mutually exclusive options in one row. */
export interface SegmentedControlProps {
  options: Array<string | { value: string;
  label: string;
  icon?: string }>;
  value?: string;
  onChange?: (value: string) => void;
}
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
