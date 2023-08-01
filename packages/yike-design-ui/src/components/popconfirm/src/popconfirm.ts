import { PopoverProps } from '../../popover/src/popover';
import { ButtonProps } from '../../button/src/button';
export interface PopconfirmProps extends PopoverProps {
  cancelText?: string;
  okText?: string;
  showCancel?: boolean;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
}
export type PopconfirmEmit = {
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (e: 'update:open', ev: boolean): void;
};
