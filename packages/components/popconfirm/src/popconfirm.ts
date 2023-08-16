import { PopoverProps } from '@yike/components/popover';
import { ButtonProps } from '@yike/components/button';
export interface PopconfirmProps extends PopoverProps {
  cancelText?: string;
  okText?: string;
  showCancel?: boolean;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  onCancel?: (() => Promise<boolean>) | (() => void);
  onConfirm?: (() => Promise<boolean>) | (() => void);
}
export type PopconfirmEmit = {
  (e: 'update:open', ev: boolean): void;
};
