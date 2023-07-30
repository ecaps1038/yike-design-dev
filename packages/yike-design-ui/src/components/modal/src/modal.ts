export type modalBaseProps = {
  title: string;
  size?: 'small' | 'large';
  modelValue: boolean;
  to?: string;
  scrollable?: boolean;
  closeable?: boolean;
  showMask?: boolean;
  escapable?: boolean;
  showFooter?: boolean;
};
