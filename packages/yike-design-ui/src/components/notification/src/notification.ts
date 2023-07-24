import type { VNode } from 'vue';
import { NotificationType } from '../../../utils/constant';
export type NotificationProps = {
  title?: string;
  message: string | VNode;
  closable?: boolean;
  showFooterBtn?: boolean;
  showIcon?: boolean;
  type?: NotificationType;
  duration?: number;
  space?: number;
  offsetY?: number;
  offsetX?: number;
  zIndex?: number;

  onClose?: () => void;
  onDestroy?: () => void;
  handleCancel?: () => void;
  handleSubmit?: () => void;
};

export interface NotificationOptions extends NotificationProps {
  id?: number | string;
  appendTo?: HTMLElement | string;
}

export type NotificationGroupProps = {
  notifications: NotificationOptions[];
};
