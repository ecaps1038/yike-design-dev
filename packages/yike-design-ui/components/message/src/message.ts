import { MessageType, type RenderContent } from '../../utils';

export type MessageProps = {
  message: RenderContent;
  type?: MessageType;
  duration?: number;
  offset?: number;
  zIndex?: number;
};

export interface MessageOptions extends MessageProps {
  id?: number | string;
  appendTo?: HTMLElement | string | Element;
  /** 消息关闭时的回调 */
  onClose?: () => void;
  /** 消息销毁时的回调 */
  onDestroy?: () => void;
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
  primary: (config: MessageProps) => MessageReturn;
  success: (config: MessageProps) => MessageReturn;
  warning: (config: MessageProps) => MessageReturn;
  error: (config: MessageProps) => MessageReturn;
  loading: (config: MessageProps) => MessageReturn;
}
