import { Ref, VNode, createVNode, render } from 'vue';
import Notification from './notification.vue';

interface NotificationQueueItem {
  vm: VNode;
}
type NotificationQueue = NotificationQueueItem[];

let seed = 1;
const notifications: NotificationQueue = [];
const VERTICAL_SPACE = 16;

type notifyFunc = (options: any) => {
  close: () => void;
};

const notify: notifyFunc = function (options = {}) {
  if (typeof options === 'string') {
    options = { message: options };
  }

  let verticalOffset = 0;
  notifications.forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + VERTICAL_SPACE;
  });
  verticalOffset += VERTICAL_SPACE;

  const id = `notification_${seed++}`;
  const userOnClose = options.onClose;

  const props: Partial<NotificationOptions> = {
    ...options,
    id,
    // zIndex: nextZIndex++,
    offset: verticalOffset,
    onClose: () => {
      close(id, userOnClose);
    },
  };

  const appendTarget: HTMLElement | null = document.body;
  const container = document.createElement('div');

  const vm = createVNode(Notification, props);
  vm.props!.onDestroy = () => {
    render(null, container);
  };

  render(vm, container);
  notifications.push({ vm });
  appendTarget.appendChild(container.firstElementChild!);

  return {
    close: () => {
      (vm.component!.exposed as { visible: Ref<boolean> }).visible.value =
        false;
    },
  };
};

function close(id: string, onClose) {
  const index = notifications.findIndex(
    ({ vm }) => vm.component?.props.id === id,
  );
  if (index === -1) return;

  const { vm } = notifications[index];

  onClose?.(vm);

  const removedHeight = vm.el!.offsetHeight;
  notifications.splice(index, 1);
  if (notifications.length < 1) return;
  for (let i = index; i < notifications.length; i++) {
    const { el, component } = notifications[i].vm;
    const pos =
      Number.parseInt(el!.style['top'], 10) - removedHeight - VERTICAL_SPACE;
    component!.props.offset = pos;
  }
}

export default notify;
