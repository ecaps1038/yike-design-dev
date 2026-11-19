import type { Size } from '../../utils';

export type FlexJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type FlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

/** gap 支持尺寸关键字、数字（px）或任意 CSS 长度字符串 */
export type FlexGap = Size | number | string;

export type FlexProps = {
  vertical?: boolean;
  justify?: FlexJustify;
  align?: FlexAlign;
  gap?: FlexGap;
  wrap?: boolean;
  inline?: boolean;
};
