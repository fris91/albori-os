import * as React from 'react';
/** Thin determinate progress bar (downloads, storage). */
export interface ProgressBarProps {
  value: number;
  label?: string;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
