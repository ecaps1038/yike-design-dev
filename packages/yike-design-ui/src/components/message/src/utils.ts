import { createVNode, render, VNode, isVNode } from 'vue';
import MessageConstructor from './message.vue';
import { MessageOptions } from './message';
import { popupManager } from '../../../utils/tools';
import { MESSAGETYPE } from '../../../utils/constant';
const instances: VNode[] = [];
// offset前缀和
const prefixSum: number[] = [0];

let seed = 0;

export const calculateOffset = (vmId: number) => {
  const idx = instances.findIndex((vm) => (vm.props!.id = vmId));
  for (let i = idx; i < instances.length; i++) {
    const vm = instances[i];
  }
  // TODO use message-list hooks manage instances
};

const message = (options: MessageOptions) => {
  const id = seed++;
  let appendTo: HTMLElement | null = document.body;
  const container = document.createElement('div');
  container.className = 'yk-message-container';
  if (typeof options.appendTo === 'string') {
    appendTo = document.querySelector(options.appendTo);
  }
  if (!(appendTo instanceof HTMLElement)) {
    appendTo = document.body;
  }
  const props = {
    zIndex: popupManager.nextIndex(),
    id,
    ...options,
    onClose: () => {
      calculateOffset(seed - 1);
    },
    onDestroy: () => {
      render(null, container);
    },
  };
  // TODO use message-list hooks manage instances
  const vm: VNode = createVNode(
    MessageConstructor,
    props,
    isVNode(props.message) ? { default: () => props.message } : null,
  );

  instances.push(vm);
  render(vm, container);
  appendTo.appendChild(container);
  const close = () => {
    vm.component?.exposed?.close();
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
