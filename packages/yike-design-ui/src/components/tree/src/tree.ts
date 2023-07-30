import { InjectionKey, Ref } from 'vue';
import { Key } from '../../utils';

export type TreeOption = {
  key: Key;
  label: string;
  children?: TreeOption[];
};

export type TreeProps = {
  options?: TreeOption[];
  blockNode?: boolean;
  defaultExpandedKeys?: Key[];
  expandedKeys?: Key[];
};

export type TreeContext = {
  blockNode?: boolean;
  expandedKey?: Ref<Key[]>;
  onExpand: (key: Key, close?: boolean, first?: boolean) => void;
};
export const TreeInjectionKey: InjectionKey<TreeContext> =
  Symbol('TreeInjectionKey');

export const TreeNodeInjectionKey: InjectionKey<{
  option: TreeOption;
  isLeaf: boolean;
  expanded: Ref<boolean>;
}> = Symbol('TreeNodeInjectionKey');
