import { createVNode, render, VNode, isVNode, h } from 'vue';
import MessageConstructor from './message.vue';
import { MessageOptions } from './message';
import { popupManager } from '../../../utils/tools';
import { MESSAGETYPE } from '../../../utils/constant';
const instances: VNode[] = [];

let seed = 0;

export const removeInstance = (vmId: number) => {
  const listContainer = document.querySelector('.yk-message-list') as Element;
  const childNodes = listContainer.childNodes;
  const childLength = childNodes.length;
  childNodes.forEach((node) => {
    if (
      node instanceof Element &&
      node.classList.contains(`yk-message__${vmId}`)
    ) {
      listContainer.removeChild(node);
      if (childLength === 1) {
        document.body.removeChild(listContainer);
      }
    }
  });
};

export const createMessageListContainer = () => {
  const currentContainer: Element | null =
    document.querySelector('.yk-message-list');
  if (!currentContainer) {
    const container = document.body!;
    const VNode = document.createElement('div');
    VNode.className = 'yk-message-list';
    container.appendChild(VNode);
  }
};

const message = (options: MessageOptions) => {
  const id = seed++;
  let appendTo: Element | null = options.appendTo as HTMLElement;
  if (typeof options.appendTo === 'string') {
    appendTo = document.querySelector(options.appendTo);
  }
  if (!appendTo) {
    createMessageListContainer();
    appendTo = document.querySelector('.yk-message-list') as Element;
  }
  const container = document.createElement('div');
  container.className = `yk-message-container yk-message__${id}`;
  const props = {
    zIndex: popupManager.nextIndex(),
    id,
    ...options,
    onClose: () => {
      options.onClose && options.onClose();
      removeInstance(id);
    },
  };
  const vm: VNode = createVNode(
    MessageConstructor,
    props,
    isVNode(props.message) ? { default: () => props.message } : null,
  );

  instances.push(vm);
  render(vm, container);
  appendTo.appendChild(container);
  const close = () => {
    vm.component?.exposed?.destroy();
  };
  return {
    close,
  };
};
MESSAGETYPE.forEach((item) => {
  message[item] = (msg, duration, onClose) => {
    const messageOptions: MessageOptions = {
      type: item,
      message: msg,
      duration,
      onClose,
    };
    return message(messageOptions);
  };
});
export default message;
