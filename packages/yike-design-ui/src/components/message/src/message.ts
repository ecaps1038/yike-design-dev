import type { VNode } from 'vue';
import { MessageType } from '../../../utils/constant';
export type MessageProps = {
  message: string | VNode;
  type?: MessageType;
  duration?: number;
  offset?: number;
  zIndex?: number;

  onClose?: () => void;
  onDestroy?: () => void;
};

export interface MessageOptions extends MessageProps {
  id?: number | string;
  appendTo?: HTMLElement | string | Element;
}

export type MessageGroupProps = {
  messages: MessageOptions[];
};
