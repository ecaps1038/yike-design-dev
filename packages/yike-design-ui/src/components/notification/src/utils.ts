import { createVNode, render, reactive, ref, isVNode } from 'vue';
import { NotificationOptions } from './notification';
import { NOTIFICATIONTYPE } from '../../../utils/constant';
import NotificationGroup from './notification-group.vue';

class NotificationManager {
  private notifications = ref<NotificationOptions[]>([]);
  private container: HTMLElement | null;
  private seed: number;
  private zIndex: number;
  public created: boolean;
  constructor() {
    this.container = document.createElement('div');
    this.container.className = `yk-notification-container`;
    this.notifications = ref([]);
    this.seed = 0;
    this.zIndex = 2001;
    this.created = true;
    const vm = createVNode(NotificationGroup, {
      notifications: this.notifications.value,
      onClose: this.remove,
      onDestroy: this.destory,
    });
    render(vm, this.container);
    document.body.appendChild(this.container);
  }
  add = (config: NotificationOptions) => {
    this.seed++;
    const id = `yk-notification__${this.seed}`;
    const notification: NotificationOptions = reactive({
      id,
      zIndex: this.zIndex,
      ...config,
    });

    this.notifications.value.push(notification);

    return {
      close: () => {
        this.remove(id);
      },
    };
  };
  remove = (id: number | string) => {
    const idx = this.notifications.value.findIndex((item) => item.id === id);
    const item = this.notifications.value[idx];
    if (item?.onClose) {
      item.onClose();
    }
    this.notifications.value.splice(idx, 1);
  };
  destory = () => {
    if (this.notifications.value.length === 0 && this.container) {
      render(null, this.container);
      document.body.removeChild(this.container);
      this.container = null;
      this.created = false;
      this.zIndex = 2001;
    }
  };
}

let Instance = <NotificationManager>{};
const notification = (options: NotificationOptions) => {
  if (!Instance.created) {
    Instance = new NotificationManager();
  }
  return Instance.add(options);
};

NOTIFICATIONTYPE.forEach((item) => {
  notification[item] = (options: { message }) => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }
    return notification({
      ...options,
      type: item,
    });
  };
});

export default notification;
