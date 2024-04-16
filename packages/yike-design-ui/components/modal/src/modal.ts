import { Size } from '../../utils';

export type modalBaseProps = {
  title: string;
  size: Size;
  modelValue: boolean;
  to?: string;
  scrollable?: boolean;
  closeable?: boolean;
  showMask?: boolean;
  escapable?: boolean;
  showFooter?: boolean;
  contentHeight?: string | number;
};
