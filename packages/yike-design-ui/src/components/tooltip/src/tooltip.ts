import { StyleValue } from 'vue';

const PLACEMENT = [
  'top',
  'topLeft',
  'topRight',

  'bottom',
  'bottomLeft',
  'bottomRight',

  'left',
  'leftTop',
  'leftBottom',

  'right',
  'rightTop',
  'rightBottom',
] as const;

// prettier-ignore
const TRIGGER = [
  'none',
  'hover',
  'click', 
  'focus', 
  'contextmenu', 
] as const;

export type Placement = (typeof PLACEMENT)[number];
export type Trigger = (typeof TRIGGER)[number];

export type TooltipProps = {
  title?: string;
  open?: boolean;
  arrow?: boolean;
  placement?: Placement;
  trigger?: Trigger | Trigger[];
  animation?: string;
  openDelay?: number;
  closeDelay?: number;
  overlayClass?: string;
  overlayStyle?: StyleValue;
  autoAdjustOverflow?: boolean;
  destroyTooltipOnHide?: boolean;
  zIndex?: number;
};

export type TooltipEmit = {
  (e: 'update:open', ev: boolean): void;
  (e: 'openChange', ev: boolean): void;
};
