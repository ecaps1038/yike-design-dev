import { InjectionKey, Ref, RenderFunction } from 'vue';
import { Key } from '../../utils';
import { _TreeNode } from './internal';

export type TreeCheckStrategy = 'all' | 'parent' | 'child';

export interface TreeProps {
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
  checkStrategy?: TreeCheckStrategy;
  /** 是否取消父子节点关联 */
  checkStrictly?: boolean;
  scrollbar?: any;
  unSelectKey?: Key;
}

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
  nodeMaps?: Map<Key, _TreeNode>;
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
