
import type { VNode } from 'vue'
export type MessageProps = {
  message: string | VNode;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  offset?: number;
  zIndex?: number;
}

export interface MessageOptions extends MessageProps {
  id?: number;
  appendTo?: HTMLElement | string;
  onDestroy?: () => {};
  onClose?: () => {};
}