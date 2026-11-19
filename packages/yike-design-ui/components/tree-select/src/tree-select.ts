import type { TreeProps, TreeOption } from '../../tree/src/tree';
import type { ScrollbarProps } from '../../scrollbar';
import type { Key, Status } from '../../utils';

/** 选中值：单选为 key，多选/勾选为 key 数组 */
export type TreeSelectValue = Key | Key[] | '' | null | undefined;

export interface TreeSelectProps {
  /** 选中值，支持 v-model（单选 Key，多选/勾选 Key[]） */
  modelValue?: TreeSelectValue;
  /** @deprecated 请使用 v-model / modelValue，保留用于向后兼容 */
  defaultValue?: TreeSelectValue;
  options?: TreeOption[];
  /** 是否显示清除按钮 */
  allowClear?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  disabled?: boolean;
  placeholder?: string;
  /** 旧版宽度倍率：宽度 = size * 200px，默认 2；推荐使用 width */
  size?: number;
  /** 组件宽度，优先级高于 size */
  width?: string | number;
  /** 树为空时显示的空状态文案 */
  emptyText?: string;
  /** 是否多选（非 checkable 模式下生效） */
  multiple?: boolean;
  /** 是否开启 checkbox 选择模式 */
  checkable?: boolean;
  /** 是否取消父子节点关联 */
  checkStrictly?: boolean;
  checkStrategy?: TreeProps['checkStrategy'];
  defaultExpandedKeys?: Key[];
  fileTree?: boolean;
  fileIcons?: TreeProps['fileIcons'];
  scrollbar?: ScrollbarProps | boolean;
  status?: Status;
}
