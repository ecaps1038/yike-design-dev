import { InjectionKey, Ref, RenderFunction } from 'vue';
import { Key } from '../../utils';

export type TreeProps = {
  options?: TreeOption[];
  blockNode?: boolean;
  defaultExpandedKeys?: Key[];
  expandedKeys?: Key[];
  selectedKeys?: Key[];
  defaultSelectedKeys?: Key[];
  multiple?: boolean;
  expandIcon?: RenderFunction;
  fileTree?: boolean;
  fileIcons?: Icons;
  checkable?: boolean;
  checkedKeys?: Key[];
  checkStrategy?: 'all' | 'parent' | 'child';
  /** 是否取消父子节点关联 */
  checkStrictly?: boolean;
};

export type Icons = {
  file?: RenderFunction;
  fold?: RenderFunction;
  unfold?: RenderFunction;
};

export type TreeOption = {
  key: Key;
  label: string;
  children?: TreeOption[];
  icons?: Icons;
};

export type TreeContext = Readonly<{
  blockNode?: boolean;
  fileTree?: boolean;
  expandedKeys?: Key[];
  selectedKeys?: Key[];
  fileIcons?: Icons;
  checkable?: boolean;
  checkedKeys?: Key[];
  checkStrategy?: 'all' | 'parent' | 'child';
  checkStrictly?: boolean;
  onExpand?: (key: Key, close?: boolean, first?: boolean) => void;
  onChecked?: (key: Key[], checked: boolean) => void;
  onSelect?: (key: Key) => void;
  expandIcon?: RenderFunction;
}>;
export const TreeInjectionKey: InjectionKey<TreeContext> =
  Symbol('TreeInjectionKey');

export const TreeNodeInjectionKey: InjectionKey<{
  option: TreeOption;
  isLeaf: boolean;
  expanded: Ref<boolean>;
}> = Symbol('TreeNodeInjectionKey');
