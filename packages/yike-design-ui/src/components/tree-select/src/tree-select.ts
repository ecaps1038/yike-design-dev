import { TreeProps } from '../../tree/src/tree';

export interface SelectType {
  allowClear?: boolean; //是否显示清除按钮
  bordered?: boolean; //是否显示边框
  defaultValue?: string; //未选中时候输入框的默认值
  disabled?: boolean; //是否禁用
  placeholder?: string; //输入框默认placeholder
  size?: number; //输入框大小
}

export interface TreeSelectType {
  lazy?: boolean; //是否异步加载tree
  emptyText?: string; //data为空时显示的文字
}

export type TreeSelectPropsType = SelectType & TreeProps & TreeSelectType;
