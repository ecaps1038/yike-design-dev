import { Size } from '../../utils';

export type InputNumberProps = {
  value?: number;
  max?: number;
  min?: number;
  step?: number;
  precision?: number;
  size?: Size;
  disabled?: boolean;

  formatter?: (value: number) => string;
};
