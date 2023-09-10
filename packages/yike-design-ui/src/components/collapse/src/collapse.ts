export type CollapseItemKey = symbol | number | string;

export type CollapseProps = {
  title?: string;
  active?: boolean;
  disabled?: boolean;
  key?: CollapseItemKey;
};

export type CollapseGroupProps = {
  border?: boolean;
};

export const collapseInjectKey = Symbol('CollapseInjectKey');
