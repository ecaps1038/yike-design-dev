import { Key } from '../../utils';
import { TreeOption } from './tree';

export type _TreeNode = TreeOption & { pKey?: Key };

export const tree2list = (tree?: TreeOption[], pKey?: Key) => {
  const nodeMap = new Map<Key, _TreeNode>();
  if (tree && tree.length === 0) return nodeMap;

  tree?.forEach((item) => {
    nodeMap.set(item.key, { ...item, pKey });
    for (const [k, v] of tree2list(item.children, item.key)) {
      nodeMap.set(k, v);
    }
  });
  return nodeMap;
};
