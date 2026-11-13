import * as React from 'react';
/** Abstract dawn wallpaper drawn from tokens; follows theme and accent. */
export interface WallpaperProps {
  variant?: 'alba'|'foschia'|'ossidiana';
  dim?: boolean;
}
export declare function Wallpaper(props: WallpaperProps): JSX.Element;
