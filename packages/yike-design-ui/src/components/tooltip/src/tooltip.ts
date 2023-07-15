const PLACEMENT = [
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
] as const;
export type Placement = (typeof PLACEMENT)[number];

const TRIGGER = ['hover', 'focus', 'click', 'contextMenu'] as const;
export type Trigger = (typeof TRIGGER)[number];

export type ToolTipProps = {
  title?: string;
  placement?: Placement;
  trigger?: Trigger | Trigger[];
  open?: boolean;
};

export type TooltipEmit = {
  (e: 'update:open', ev: boolean): void;
};
