import * as React from 'react';
/** 390×844 device frame that scopes theme, accent, motion and text scale. */
export interface PhoneFrameProps {
  theme?: 'dark'|'light';
  accent?: 'sole'|'corallo'|'salvia'|'adriatico';
  motion?: 'reduced';
  textScale?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function PhoneFrame(props: PhoneFrameProps): JSX.Element;
