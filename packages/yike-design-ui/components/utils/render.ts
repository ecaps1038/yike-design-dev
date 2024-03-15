import { createTextVNode, isVNode } from 'vue';

/** 支持 jsx 写法
 *
 * FIXME: 返回的 VNodeChild 在 component 组件上使用类型报错，所以返回 any
 */
export const render = (r: any, ...args: any): any => {
  if (typeof r === 'function') {
    return r(...args);
  } else if (typeof r === 'string') {
    return createTextVNode(r);
  } else if (typeof r === 'number') {
    return createTextVNode(String(r));
  } else if (isVNode(r)) {
    return r;
  } else {
    return null;
  }
};
