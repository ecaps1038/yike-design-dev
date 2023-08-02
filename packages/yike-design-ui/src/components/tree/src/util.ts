import { Key } from '../../utils';
import { TreeOption } from './tree';

/** 获取所有后代节点的 key */
export function getOffspringKeys(root: TreeOption) {
  let keys: Key[] = [];
  root.children?.forEach((c) => {
    keys.push(c.key);
    if (c.children && c.children.length > 0) {
      keys = keys.concat(getOffspringKeys(c));
    }
  });
  return keys;
}
