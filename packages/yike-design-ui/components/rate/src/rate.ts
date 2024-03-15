import { Size } from '../../utils';

export type RateProps = {
  count?: string | number;
  modelValue?: string | number;
  defaultValue?: string | number;
  allowHalf?: boolean;
  allowClear?: boolean;
  grading?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  color?: string;
  icon?: string;
  size?: Size;
};
