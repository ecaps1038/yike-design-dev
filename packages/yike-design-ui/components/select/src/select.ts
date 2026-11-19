import type { Size, Status } from '../../utils';

let selectIdSeed = 0;

/** 生成组件内唯一 id（必须放在模块作用域，<script setup> 内会随实例重置） */
export const genSelectId = () => ++selectIdSeed;

export type SelectOptionValue = string | number | boolean;

export type SelectOption = {
  value: SelectOptionValue;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  modelValue?: SelectOptionValue | SelectOptionValue[];
  options?: SelectOption[];
  multiple?: boolean;
  disabled?: boolean;
  filterable?: boolean;
  clearable?: boolean;
  /** 下拉加载中 */
  loading?: boolean;
  loadingText?: string;
  /** 未选择时的占位文案 */
  placeholder?: string;
  /** filterable 时搜索框的占位文案 */
  filterPlaceholder?: string;
  /** 无匹配选项时的文案 */
  emptyText?: string;
  size?: Size;
  status?: Status;
};
