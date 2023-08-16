type ParentComputedStyle = CSSStyleDeclaration | { [key: string]: string };

/**
 * @function splitCameCase  驼峰单词拆分
 * @param str  需要拆分处理的字符串
 * @returns  返回拆分后的结果 是一个数组
 */
export function splitCameCase(str: string): string[] {
  const matches = str.match(/[A-Z]?[a-z]+|[0-9]+/g);

  return matches ? matches : [];
}

/**
 * @function getParentNode 获取目标元素的父元素
 */
export function getParentNode(node: Node) {
  const parent: HTMLElement | ShadowRoot | ParentNode | null = node.parentNode;

  if (
    parent &&
    parent.nodeType == 11 &&
    parent instanceof ShadowRoot &&
    parent.host
  ) {
    return parent.host;
  }

  if (parent && parent instanceof HTMLElement && parent.assignedSlot) {
    return parent.assignedSlot.parentNode;
  }

  return parent;
}

/**
 * @function getView 获取指定元素上层的视图元素
 * */
export function getView(target: HTMLElement) {
  if (window.getComputedStyle(target).display == 'none') return;
  let parent = getParentNode(target);
  let atRoot = false;

  while (!atRoot) {
    const parentComputedStyle: ParentComputedStyle =
      parent!.nodeType == 1 ? window.getComputedStyle(parent as Element) : {};

    if (parentComputedStyle.display == 'none') return;

    if (parent == document) {
      atRoot = true;
    } else {
      if (
        parent != document.body &&
        parent != document.documentElement &&
        parentComputedStyle.overflow != 'visible'
      ) {
        break;
      }
    }

    parent = getParentNode(parent!);
  }
  return parent;
}
