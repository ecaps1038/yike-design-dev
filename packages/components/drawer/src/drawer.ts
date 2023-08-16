type DrawerPlacements = 'right' | 'left' | 'top' | 'bottom';

export type DrawerProps = {
  show?: boolean;
  size?: string;
  title?: string;
  scrollable?: boolean;
  closable?: boolean;
  escapable?: boolean;
  showMask?: boolean;
  placement?: DrawerPlacements;
  to?: string;
};
