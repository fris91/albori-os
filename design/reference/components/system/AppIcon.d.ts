import * as React from 'react';
/** App icon tile with the Albori material (machined edge + dawn glow) and label. */
export interface AppIconProps {
  app?: 'telefono'|'messaggi'|'browser'|'fotocamera'|'galleria'|'file'|'impostazioni'|'calendario'|'orologio'|'mappe'|'contatti'|'email'|'musica'|'note'|'store'|'sicurezza';
  icon?: string;
  label?: string;
  size?: number;
  variant?: 'auto'|'grafite'|'porcellana'|'alba'|'contorno';
  showLabel?: boolean;
  badge?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function AppIcon(props: AppIconProps): JSX.Element;
