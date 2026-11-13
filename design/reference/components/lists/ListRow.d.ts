import * as React from 'react';
/** 56px list row: icon, title, subtitle, value, chevron or trailing control. */
export interface ListRowProps {
  icon?: string;
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  value?: React.ReactNode;
  chevron?: boolean;
  trailing?: React.ReactNode;
  onClick?: () => void;
}
export declare function ListRow(props: ListRowProps): JSX.Element;
