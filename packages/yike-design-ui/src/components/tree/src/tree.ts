import { InjectionKey, Ref, RenderFunction } from 'vue';
import { Key } from '../../utils';

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
};

export type TreeContext = {
  blockNode?: boolean;
  fileTree?: boolean;
  expandedKeys?: Ref<Key[]>;
  selectedKeys?: Ref<Key[]>;
  fileIcons?: Icons;
  onExpand?: (key: Key, close?: boolean, first?: boolean) => void;
  onSelect?: (key: Key) => void;
  expandIcon?: RenderFunction;
};
export const TreeInjectionKey: InjectionKey<TreeContext> =
  Symbol('TreeInjectionKey');

export const TreeNodeInjectionKey: InjectionKey<{
  option: TreeOption;
  isLeaf: boolean;
  expanded: Ref<boolean>;
}> = Symbol('TreeNodeInjectionKey');
