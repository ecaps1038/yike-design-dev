import { TooltipProps, Trigger } from '../../tooltip';
import { Size, Type } from '../../utils';

export type dropdownTrigger = Exclude<Trigger, 'focus'>;

export interface DropdownProps extends TooltipProps {
  type?: Type;
  size?: Size;
  disabled?: boolean;
  trigger?: dropdownTrigger | dropdownTrigger[];
}

export interface DropdownItemProps {
  value?: string | number | object;
  disabled?: boolean;
}
