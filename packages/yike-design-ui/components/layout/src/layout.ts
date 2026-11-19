import type { InjectionKey, Ref } from 'vue';

export type LayoutDirection = 'horizontal' | 'vertical';

export type LayoutProps = {
  /** 布局方向，不传时根据是否包含 Sider 自动判断 */
  direction?: LayoutDirection;
};

export type LayoutHeaderProps = {
  height?: number | string;
};

export type LayoutFooterProps = {
  height?: number | string;
};

export type LayoutSiderProps = {
  width?: number | string;
  collapsedWidth?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  theme?: 'light' | 'dark';
};

export type LayoutContext = {
  siderCount: Ref<number>;
  registerSider: () => void;
  unregisterSider: () => void;
};

export const layoutContextKey: InjectionKey<LayoutContext> =
  Symbol('yk-layout');
