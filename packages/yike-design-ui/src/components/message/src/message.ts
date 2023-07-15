import type { VNode, ComponentInternalInstance } from 'vue';
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
  id?: number;
  appendTo?: HTMLElement | string;
}

export interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void;
}
