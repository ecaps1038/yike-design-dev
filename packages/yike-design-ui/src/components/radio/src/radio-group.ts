import { Size, Direction } from '../../utils';
import { radioEmits } from './radio';

export type GapSize = Size | number | [number, number];

export type RadioGroupProps = {
  modelValue?: number | string | boolean;
  size?: GapSize;
  type?: 'radio' | 'button';
  solid?: boolean;
  disabled?: boolean;
  direction?: Direction;
};

export const radioGroupEmits = radioEmits;
export type RadioGroupEmits = typeof radioGroupEmits;
