import type { InjectionKey } from 'vue';

export type CollapseItemKey = symbol | number | string;

export type CollapseProps = {
  title?: string;
  /** 是否展开（独立使用时可配合 v-model:active） */
  active?: boolean;
  disabled?: boolean;
  /** 面板标识，用于 CollapseGroup 的 v-model / accordion 模式；不填则自动生成 */
  name?: CollapseItemKey;
};

export type CollapseGroupProps = {
  border?: boolean;
  /** 手风琴模式：同一时间只展开一个面板 */
  accordion?: boolean;
  /** 展开的面板 name，手风琴模式下为单个值，否则为数组 */
  modelValue?: CollapseItemKey | CollapseItemKey[];
  /** 非受控模式的默认展开项 */
  defaultValue?: CollapseItemKey | CollapseItemKey[];
};

export type CollapseContext = {
  accordion: boolean;
  isOpened: (name: CollapseItemKey) => boolean;
  toggle: (name: CollapseItemKey) => void;
};

export const collapseInjectKey: InjectionKey<CollapseContext> =
  Symbol('CollapseInjectKey');

let collapseIdSeed = 0;

/** 生成组件内唯一 id（必须放在模块作用域，<script setup> 内会随实例重置） */
export const genCollapseId = (prefix: string) =>
  `${prefix}-${++collapseIdSeed}`;
