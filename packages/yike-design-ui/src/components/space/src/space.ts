import { Size } from '../../../utils/constant';

export const DIRECTION = ['vertical', 'horizontal'] as const;

export type Direction = (typeof DIRECTION)[number];

export const ALIGN = ['start', 'end', 'center', 'baseline'] as const;

export type Align = (typeof ALIGN)[number];

export type GapSize = Size | number;

export type SpaceProps = {
  direction?: Direction;
  aline?: Align;
  wrap?: boolean;
  /**
   * horizontal gap size, several values supported: s: 4px,m:8px,l:16px,xl:24px
   */
  size?: GapSize;
  /**
   * vertical gap size, several values supported: s: 4px,m:8px,l:16px,xl:24px
   */
  rsize?: GapSize;
};
