export type DrawerProps = {
  show?: boolean;
  size?: string;
  title?: string;
  scrollable?: boolean;
  closable?: boolean;
  escapable?: boolean;
  placement?: 'right' | 'left' | 'top' | 'bottom';
  to?: string;

  debug?: boolean;
};
