import { TooltipProps } from '../../tooltip/src/tooltip';
import { Size, Type } from '../../utils/constant';

const TRIGGER = ['hover', 'click', 'contextMenu'] as const;
export type Trigger = (typeof TRIGGER)[number];

export interface DropdownProps extends TooltipProps {
  type?: Type;
  size?: Size;
  disabled?: boolean;
  trigger?: Trigger | Trigger[];
}

export interface DropdownItemProps {
  value?: string | number | object;
  disabled?: boolean;
}
