import type { Component, ComputedRef, InjectionKey } from 'vue';

export type MenuKey = string | number;

export type MenuItem = {
  key: MenuKey;
  label: string;
  icon?: Component;
  disabled?: boolean;
  children?: MenuItem[];
};

export type MenuProps = {
  items?: MenuItem[];
  /** 当前选中项，支持 v-model */
  modelValue?: MenuKey;
  /** 展开的子菜单 key（受控） */
  openKeys?: MenuKey[];
  defaultOpenKeys?: MenuKey[];
  mode?: 'horizontal' | 'vertical';
  theme?: 'light' | 'dark';
  selectable?: boolean;
};

export type MenuContext = {
  mode: ComputedRef<'horizontal' | 'vertical'>;
  theme: ComputedRef<'light' | 'dark'>;
  isOpen: (key: MenuKey) => boolean;
  isSelected: (key: MenuKey) => boolean;
  select: (item: MenuItem) => void;
  toggleOpen: (key: MenuKey) => void;
};

export const menuContextKey: InjectionKey<MenuContext> = Symbol('yk-menu');
