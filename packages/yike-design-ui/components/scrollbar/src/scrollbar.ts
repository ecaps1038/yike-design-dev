import { InjectionKey } from 'vue';

export type ScrollbarProps = {
  /** 容器高度 @default 100% */
  height?: string | number;
  /** 是否显示原生滚动条 @default false */
  native?: boolean;
  /** 是否总是显示滚动条 @default false */
  always?: boolean;
  /** 容器高度不会变化可以开启此选项，优化性能 @default false */
  noresize?: boolean;
};

type ScrollbarContext = {
  scrollbarEl?: HTMLDivElement;
  wrapEl?: HTMLDivElement;
};
export const scrollbarContextKey: InjectionKey<ScrollbarContext> =
  Symbol('scrollbarContext');
