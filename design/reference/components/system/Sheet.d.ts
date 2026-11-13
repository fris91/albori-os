import * as React from 'react';
/** Bottom sheet container with grabber and title. */
export interface SheetProps {
  title?: string;
  children?: React.ReactNode;
}
export declare function Sheet(props: SheetProps): JSX.Element;
