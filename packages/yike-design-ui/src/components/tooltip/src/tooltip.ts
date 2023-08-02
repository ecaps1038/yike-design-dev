import { StyleValue } from 'vue';

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

const TRIGGER = ['hover', 'focus', 'click', 'contextMenu', 'none'] as const;
export type Trigger = (typeof TRIGGER)[number];

export type TooltipProps = {
  title?: string;
  placement?: Placement;
  trigger?: Trigger | Trigger[];
  open?: boolean;
  closeDelay?: number;
  openDelay?: number;
  autoAdjustOverflow?: boolean;
  overlayStyle?: StyleValue;
  overlayClassName?: string;
  zIndex?: number;
  destroyTooltipOnHide?: boolean;
  arrow?: boolean;
};

export type TooltipEmit = {
  (e: 'update:open', ev: boolean): void;
  (e: 'openChange', ev: boolean): void;
};
