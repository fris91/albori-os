import * as React from 'react';
/** Top status bar: time, privacy indicator, signal, Wi-Fi, battery %. */
export interface StatusBarProps {
  time?: string;
  battery?: number;
  charging?: boolean;
  privacy?: 'camera'|'mic'|'location';
  silent?: boolean;
}
export declare function StatusBar(props: StatusBarProps): JSX.Element;
