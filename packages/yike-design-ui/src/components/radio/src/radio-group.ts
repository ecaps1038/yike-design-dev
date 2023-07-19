import { Size, Direction } from '../../../utils/constant';
import { radioEmits } from './radio';

export type RadioGroupProps = {
  modelValue?: number | string | boolean;
  size?: Size;
  disabled?: boolean;
  direction?: Direction;
};

export const radioGroupEmits = radioEmits;
export type RadioGroupEmits = typeof radioGroupEmits;
