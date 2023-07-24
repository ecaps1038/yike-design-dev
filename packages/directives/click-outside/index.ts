/**
 * 判断是否点击了指令绑定的元素之外的元素
 * vueuse 包含函数 onclickoutside
 * 但只能针对单个元素
 * 该指令可 拓展为多个元素作为事件目标
 */

// TODO
// https://github.com/element-plus/element-plus/blob/f93a9eb6cd0fd7c3760845731dcfcd7464ff80a9/packages/directives/click-outside/index.ts
// https://www.cnblogs.com/wenqiangit/p/10551489.html
import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from 'vue';
import { isClient } from '@yike/utils';

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void;
type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler;
    bindingFn: (...args: unknown[]) => unknown;
  }[]
>;

const nodeList: FlushList = new Map();

let startClick: MouseEvent;

const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false;
  return e instanceof Element;
};

if (isClient) {
  document.addEventListener('mousedown', (e: MouseEvent) => (startClick = e));
  document.addEventListener('mouseup', (e: MouseEvent) => {
    for (const handlers of nodeList.values()) {
      for (const { documentHandler } of handlers) {
        documentHandler(e as MouseEvent, startClick);
      }
    }
  });
}

function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding) {
  let excludes: HTMLElement[] = [];
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg;
  } else if (isElement(binding.arg)) {
    // 类型转换
    excludes.push(binding.arg as unknown as HTMLElement);
  }
  return function (mouseup, mousedown) {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: HTMLElement;
      }>
    ).popperRef;
    const mouseUpTarget = mouseup.target as Node;
    const mouseDownTarget = mousedown.target as Node;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl =
      el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;
    const isTargetExcluded =
      (excludes.length &&
        excludes.some((item) => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement));
    const isContainedByPopper =
      popperRef &&
      (popperRef.contains(mouseUpTarget) ||
        popperRef.contains(mouseDownTarget));
    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return;
    }
    binding.value(mouseup, mousedown);
  };
}

const ClickOutside: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }

    nodeList.get(el)!.push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    });
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }

    const handlers = nodeList.get(el)!;
    const oldHandlerIndex = handlers.findIndex(
      (item) => item.bindingFn === binding.oldValue,
    );
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    };

    if (oldHandlerIndex >= 0) {
      // replace the old handler to the new handler
      handlers.splice(oldHandlerIndex, 1, newHandler);
    } else {
      handlers.push(newHandler);
    }
  },
  unmounted(el: HTMLElement) {
    nodeList.delete(el);
  },
};
export default ClickOutside;
