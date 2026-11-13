import * as React from 'react';
/** 0–100 slider: thick `fill` for brightness/volume, `thin` for settings. */
export interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  icon?: string;
  variant?: 'fill'|'thin';
  showValue?: boolean;
  label?: string;
}
export declare function Slider(props: SliderProps): JSX.Element;
