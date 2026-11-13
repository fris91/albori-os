import * as React from 'react';
/** Pill search input; `glass` over wallpaper. */
export interface SearchFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  glass?: boolean;
  onClear?: () => void;
  style?: React.CSSProperties;
}
export declare function SearchField(props: SearchFieldProps): JSX.Element;
