import type { InjectionKey, Ref } from 'vue';

export type GridGutter = number | [number, number];

export type RowJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type RowAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type RowProps = {
  /** 栅格间隔：数字表示水平间隔，数组表示 [水平, 垂直] */
  gutter?: GridGutter;
  justify?: RowJustify;
  align?: RowAlign;
  wrap?: boolean;
};

export type ColSize = number | { span?: number; offset?: number };

export type ColProps = {
  /** 占据的栅格数（1-24） */
  span?: number;
  /** 向右偏移的栅格数 */
  offset?: number;
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
};

export type GridContext = {
  gutter: Ref<[number, number]>;
};

export const rowContextKey: InjectionKey<GridContext> = Symbol('yk-row');

export const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Breakpoint = (typeof BREAKPOINTS)[number];
