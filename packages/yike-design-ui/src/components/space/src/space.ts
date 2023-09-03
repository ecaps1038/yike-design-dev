import { Size } from '../../utils';

export const DIRECTION = ['vertical', 'horizontal'] as const;

export type Direction = (typeof DIRECTION)[number];

export const ALIGN = ['start', 'end', 'center', 'baseline'] as const;

export type Align = (typeof ALIGN)[number];

export type GapSize = Size | number | [number, number];

export type SpaceProps = {
  direction?: Direction;
  align?: Align;
  wrap?: boolean;
  /**
   * constant: s|m|l|xl
   * number
   * array: [x, y]
   */
  size?: GapSize;
};
