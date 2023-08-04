import { InjectionKey } from 'vue';

export type ScrollbarProps = {
  // 容器高度
  height?: string | number;
  // 是否显示原生滚动条
  native?: boolean;
  // 是否总是显示滚动条
  always?: boolean;
  // 是否横向显示
  horizontal?: boolean;
  minSize?: number;
  // 与边间距
  space?: number;
  // 是否显示
  show?: boolean;
  // 横向滚动是否开启
  xScrollable?: boolean;
  noresize?: boolean;
};

type ScrollbarContext = {
  scrollbarEl?: HTMLDivElement;
  wrapEl?: HTMLDivElement;
};
export const scrollbarContextKey: InjectionKey<ScrollbarContext> =
  Symbol('scrollbarContext');
