import { createVNode, render, ref, reactive } from 'vue';
import { MessageOptions } from './message';
import { MESSAGETYPE, RenderContent } from '../../utils';
import MessageGroup from './message-group.vue';

class MessageManager {
  private messages = ref<MessageOptions[]>([]);
  private container: HTMLElement | null;
  private seed: number;
  private zIndex: number;
  public created: boolean;
  constructor() {
    this.container = document.createElement('div');
    this.container.className = `yk-message-container`;
    this.messages = ref([]);
    this.seed = 0;
    this.zIndex = 2001;
    this.created = true;
    const vm = createVNode(MessageGroup, {
      messages: this.messages.value,
      onClose: this.remove,
      onDestroy: this.destroy,
    });
    render(vm, this.container);
    document.body.appendChild(this.container);
  }
  add = (config: MessageOptions) => {
    this.seed++;
    const id = `yk-message__${this.seed}`;
    const message = reactive<MessageOptions>({
      id,
      ...config,
      zIndex: this.zIndex,
    });
    this.messages.value.push(message);
    return {
      close: () => this.remove(id),
    };
  };
  remove = (id: number | string) => {
    const idx = this.messages.value.findIndex((item) => item.id === id);
    const item = this.messages.value[idx];
    if (item?.onClose) {
      item.onClose();
    }
    this.messages.value.splice(idx, 1);
  };
  destroy = () => {
    if (this.messages.value.length === 0 && this.container) {
      render(null, this.container);
      document.body.removeChild(this.container);
      this.container = null;
      this.created = false;
      this.zIndex = 2001;
    }
  };
  close = () => {
    // console.log('closeAll');
  };
}
let Instance = <MessageManager>{};
const message: any = (options: MessageOptions) => {
  if (!Instance.created) {
    Instance = new MessageManager();
  }
  return Instance.add(options);
};
MESSAGETYPE.forEach((item) => {
  message[item] = (msg: RenderContent, duration: number, onClose: any) => {
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
