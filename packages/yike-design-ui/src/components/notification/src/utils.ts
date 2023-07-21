import { createVNode, render, reactive, ref } from 'vue';
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
      ...config,
      zIndex: this.zIndex,
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
  close = () => {
    console.log('closeAll');
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
  notification[item] = (msg, duration, onClose) => {
    const NotificationOptions: NotificationOptions = {
      type: item,
      message: msg,
      duration,
      onClose,
    };
    return notification(NotificationOptions);
  };
});

export default notification;

// const instances: VNode[] = []

// let seed = 0;
// const GAP_SIZE = 16;

// const notification = (options: NotificationOptions) => {
//   let appendTo: HTMLElement | null = document.body

//   if (typeof options.appendTo === 'string') {
//     appendTo = document.querySelector(options.appendTo)
//   }
//   if (!(appendTo instanceof HTMLElement)) {
//     appendTo = document.body
//   }

//   let verticalOffset = options.offsetY || 0
//   instances.forEach((vm) => {
//     verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE
//   })
//   verticalOffset += GAP_SIZE

//   const onClose = options.onClose
//   const id = seed++
//   const props = {
//     ...options,
//     zIndex: popupManager.nextIndex(),
//     id,
//     offsetY: verticalOffset,
//     onclose: () => {
//       close(id, onClose)
//     }
//   }
//   const container = document.createElement('div')
//   container.className = 'yk-notification-container'
//   const vm: VNode = createVNode(
//     NotificationConstructor,
//     props,
//     isVNode(props.message) ? { default: () => props.message } : null,
//   )
//   vm.props!.onDestroy = () => {
//     render(null, container)
//   }

//   instances.push(vm)
//   render(vm, container)
//   appendTo.appendChild(container)

//   return {
//     close: () => {
//       ; (vm.component!.exposed as { isShow: Ref<boolean> }).isShow.value =
//         false
//     },
//   }
// }
// NOTIFICATIONTYPE.forEach((item) => {
//   notification[item] = (msg, duration, onClose) => {
//     const NotificationOptions: NotificationOptions = {
//       type: item,
//       message: msg,
//       duration,
//       onClose,
//     }
//     return notification(NotificationOptions)
//   }
// })

// export function close(
//   id: number,
//   userOnClose?: (vm: VNode) => void
// ): void {
//   console.log("-------------------------------");

//   const orientedNotifications = instances
//   const idx = orientedNotifications.findIndex(
//     (vm) => vm.component?.props.id === id
//   )
//   if (idx === -1) return
//   const vm = orientedNotifications[idx]
//   if (!vm) return
//   // calling user's on close function before notification gets removed from DOM.
//   userOnClose?.(vm)

//   // note that this is called @before-leave, that's why we were able to fetch this property.
//   const removedHeight = vm.el!.offsetHeight
//   const verticalPos = "top"
//   // const verticalPos = position.split('-')[0]
//   orientedNotifications.splice(idx, 1)
//   const len = orientedNotifications.length
//   if (len < 1) return
//   // starting from the removing item.
//   for (let i = idx; i < len; i++) {
//     // new position equals the current offsetTop minus removed height plus 16px(the gap size between each item)
//     const { el, component } = orientedNotifications[i]
//     const pos =
//       Number.parseInt(el!.style[verticalPos], 10) - removedHeight - GAP_SIZE
//     component!.props.offsetY = pos
//   }
// }

// export function closeAll(): void {
//   // loop through all directions, close them at once.
//   instances.forEach((vm) => {
//     // same as the previous close method, we'd like to make sure lifecycle gets handle properly.
//     ; (vm.component!.exposed as { isShow: Ref<boolean> }).isShow.value =
//       false
//   })
// }

// notification.closeAll = closeAll

// export default notification
