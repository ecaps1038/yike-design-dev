type ParentComputedStyle = CSSStyleDeclaration | { [key: string]: string };
type ParentNodeType = HTMLElement | ShadowRoot | ParentNode | null;

/**
 * 将驼峰命名字符串拆分为单词或数字的数组。
 *
 * @param {string} str - 要拆分的驼峰命名字符串。
 * @returns {string[]} - 包含拆分结果的数组。
 * @example
 * const inputStr = "TopLeft";
 * const result = splitCamelCase(inputStr);
 * // 输出：["Top", "Left"]
 */
export function splitCamelCase(str: string): string[] {
  return str.match(/[A-Z]?[a-z]+|[0-9]+/g) || [];
}

/**
 * @function getParentNode 获取目标元素的父元素
 */
export function getParentNode(node: Node) {
  const parent: ParentNodeType = node.parentNode;

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
