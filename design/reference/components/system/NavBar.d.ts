import * as React from 'react';
/** Bottom system navigation: gesture pill or three accessible buttons. */
export interface NavBarProps {
  mode?: 'gesture'|'buttons';
  onBack?: () => void;
  onHome?: () => void;
  onRecents?: () => void;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
