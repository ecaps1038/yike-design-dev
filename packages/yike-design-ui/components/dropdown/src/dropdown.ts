import { TooltipProps, Trigger } from '../../tooltip';
import { Size, Type } from '../../utils';
import type { Ref } from 'vue';

export type DropdownTrigger = Exclude<Trigger, 'focus'>;
export interface DropdownProps extends TooltipProps {
  type?: Type;
  size?: Size;
  disabled?: boolean;
  trigger?: DropdownTrigger | DropdownTrigger[];
}

export type DropdownEmits = {
  selected: [value: string | number | object];
  visibleChange: [value: boolean];
};

export interface DropdownItemProps {
  value?: string | number | object;
  disabled?: boolean;
  submenu?: boolean;
  animation?: string;
  dir?: 'left' | 'right';
}

export type DropdownItemValue = Ref<string | number | object>;

export interface DropdownOption extends DropdownProps {
  isOpen: Ref<boolean>;
  selectedValue: DropdownItemValue;
  placement?: 'leftTop' | 'rightTop';
}
