import { TooltipProps, Trigger } from '@yike/components/tooltip';
import { Size, Type } from '@yike/utils';

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
