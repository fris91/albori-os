import * as React from 'react';
/** Multi-select checkbox with label. */
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
