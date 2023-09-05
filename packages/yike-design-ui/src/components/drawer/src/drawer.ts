export const Drawer_Placements = ['left', 'right', 'top', 'bottom'] as const;
export type DrawerPlacements = (typeof Drawer_Placements)[number];

export type DrawerProps = {
  show?: boolean;
  size?: string;
  title?: string;
  scrollable?: boolean;
  closable?: boolean;
  escapable?: boolean;
  showMask?: boolean;
  placement?: DrawerPlacements;
  to?: string | HTMLElement;
};
