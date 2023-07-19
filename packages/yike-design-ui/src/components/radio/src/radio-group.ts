import { Size } from '../../../utils/constant';
import { radioEmits } from './radio';
export const DIRECTION = ['vertical', 'horizontal'] as const;
export type RadioGroupProps = {
  modelValue?: number | string | boolean;
  size?: Size;
  disabled?: boolean;
  direction?: (typeof DIRECTION)[number];
};

export const radioGroupEmits = radioEmits;
export type RadioGroupEmits = typeof radioGroupEmits;
