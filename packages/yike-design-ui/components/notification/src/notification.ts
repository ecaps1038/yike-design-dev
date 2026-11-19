import { NotificationType, type RenderContent } from '../../utils';
export type NotificationProps = {
  title?: string;
  message: RenderContent;
  closable?: boolean;
  showFooterBtn?: boolean;
  showIcon?: boolean;
  type?: NotificationType;
  duration?: number;
  space?: number;
  zIndex?: number;
  dangerouslyUseHTMLString?: boolean;
  position?: NotificationPosition;

  handleCancel?: () => void;
  handleSubmit?: () => void;
};

export interface NotificationOptions extends NotificationProps {
  id?: number | string;
  appendTo?: HTMLElement | string;
  /** 通知关闭时的回调 */
  onClose?: () => void;
  /** 通知销毁时的回调 */
  onDestroy?: () => void;
}

export type NotificationGroupProps = {
  notifications: NotificationOptions[];
  position: NotificationPosition;
};

export const NOTIFICATION_POSITION = [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
] as const;

export type NotificationPosition = (typeof NOTIFICATION_POSITION)[number];
