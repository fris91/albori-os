import * as React from 'react';
/** Single-choice radio with label. */
export interface RadioProps {
  checked?: boolean;
  onChange?: (checked: true) => void;
  children?: React.ReactNode;
}
export declare function Radio(props: RadioProps): JSX.Element;
