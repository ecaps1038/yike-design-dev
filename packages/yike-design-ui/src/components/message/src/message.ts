import type { VNode } from 'vue';
import { MessageType } from '../../utils/constant';
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

export type MessageFunctions = {
  success: () => void;
  error: () => void;
  loading: () => void;
  primary: () => void;
  warning: () => void;
};

export interface MessageReturn {
  close: () => void;
}

export interface MessageMethod {
  parimary: (config: MessageProps) => MessageReturn;
  success: (config: MessageProps) => MessageReturn;
  warning: (config: MessageProps) => MessageReturn;
  error: (config: MessageProps) => MessageReturn;
  loading: (config: MessageProps) => MessageReturn;
}
