import { Size } from '../../utils/constant';
export type CheckboxGroupProps = {
  modelValue?: Array<CheckboxGroupValue>;
  defaultValue?: Array<CheckboxGroupValue>;
  disabled?: boolean;
  max?: number;
  tag?: string;
  direction?: 'horizontal' | 'vertical';
  options?: Array<CheckboxOption | CheckboxGroupValue>;
  gap?: Size | number | number[];
  size?: Size;
};

export type CheckboxOption = {
  label: string;
  value: CheckboxGroupValue;
  disabled?: boolean;
  indeterminate?: boolean;
};

export type CheckboxGroupValue = string | number;
