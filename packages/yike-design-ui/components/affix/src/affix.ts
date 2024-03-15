export type AffixProps = {
  position?: 'top' | 'bottom';
  target?: string | HTMLElement | Window;
  offset?: number;
  zIndex?: number;
};

export type TargetRect = {
  top: number;
  bottom: number;
};
