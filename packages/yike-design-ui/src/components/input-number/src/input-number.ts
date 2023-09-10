import { Size } from '../../utils';

export type InputNumberProps = {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  precision?: number;
  size?: Size;
  disabled?: boolean;
  message?: string;

  formatter?: (value: number) => string;
};
