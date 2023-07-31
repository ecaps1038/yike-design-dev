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
  offsetY?: number;
  offsetX?: number;
  zIndex?: number;
  dangerouslyUseHTMLString?: boolean;

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
