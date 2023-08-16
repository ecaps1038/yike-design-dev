import { Size } from '@yike/utils';

export type InputNumberProps = {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  precision?: number;
  size?: Size;
  disabled?: boolean;

  formatter?: (value: number) => string;
};
