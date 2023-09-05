import { createVNode, render, reactive, ref } from 'vue';
import { NotificationOptions, NotificationPosition } from './notification';
import { NOTIFICATIONTYPE } from '../../utils';
import NotificationGroup from './notification-group.vue';

class NotificationManager {
  private notifications = ref<NotificationOptions[]>([]);
  private container: HTMLElement | null;
  private seed: number;
  private zIndex: number;
  private position: NotificationPosition;
  constructor(options: NotificationOptions) {
    const { position = 'topRight' } = options;
    this.container = document.createElement('div');
    this.container.className = `yk-notification-container yk-notification-container-${position}`;
    this.notifications = ref([]);
    this.seed = 0;
    this.zIndex = 2001;
    this.position = position;

    const vm = createVNode(NotificationGroup, {
      notifications: this.notifications.value,
      position,
      onClose: this.remove,
      onDestroy: this.destory,
    });
    render(vm, this.container);
    document.body.appendChild(this.container);
  }
  add = (options: NotificationOptions) => {
    this.seed++;
    const id = `yk-notification__${this.seed}`;
    const notification = reactive<NotificationOptions>({
      id,
      zIndex: this.zIndex,
      ...options,
    });

    if (this.position.indexOf('bottom') !== -1) {
      this.notifications.value.unshift(notification);
    } else {
      this.notifications.value.push(notification);
    }

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
      this.zIndex = 2001;
      notificaitionInstance[this.position] = undefined;
    }
  };
}

const notificaitionInstance: {
  topLeft?: NotificationManager;
  topRight?: NotificationManager;
  bottomLeft?: NotificationManager;
  bottomRight?: NotificationManager;
} = {};

export const notification: any = (options: NotificationOptions) => {
  const { position = 'topRight' } = options;
  if (!notificaitionInstance[position]) {
    notificaitionInstance[position] = new NotificationManager(options);
  }
  return notificaitionInstance[position].add(options);
};

NOTIFICATIONTYPE.forEach((item) => {
  notification[item] = (options: NotificationOptions) => {
    return notification({
      ...options,
      type: item,
    });
  };
});

/** 定制 Notificaition setTimeout，支持鼠标移入暂停，鼠标移出重启倒计时，
 *  鼠标移出时首个组件重置倒计时为duration，后继组件根据移入时的时间差，递增倒计时 */
export class pauseSetTimeout {
  private cb: () => void;
  private setTimeoutID!: number;
  private startTime!: number;
  private duration!: number;
  public remainTime!: number;
  public isFixed!: boolean; //duration <= 0, 组件不自动消失
  constructor(cb: () => void, delay: number) {
    this.cb = cb;
    this.remainTime = delay;
    this.duration = delay;
    this.isFixed = delay <= 0 ? true : false;
  }

  pause = () => {
    if (this.isFixed) return;
    clearTimeout(this.setTimeoutID);
    this.remainTime -= Date.now() - this.startTime;
  };

  play = (firstRemainTime: number, isFirstPlay = false) => {
    if (this.isFixed) return;

    clearTimeout(this.setTimeoutID);
    !isFirstPlay &&
      (this.remainTime = this.remainTime - firstRemainTime + this.duration);
    this.startTime = Date.now();

    this.setTimeoutID = Number(
      setTimeout(() => {
        this.cb();
      }, this.remainTime),
    );
  };
}
