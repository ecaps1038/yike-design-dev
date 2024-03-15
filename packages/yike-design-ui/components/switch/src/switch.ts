/* eslint-disable unused-imports/no-unused-vars */
export type SwitchProps = {
  modelValue: boolean | string | number;
  size?: 's' | 'm';
  loading?: boolean;
  disabled?: boolean;
  checkedValue?: boolean | string | number;
  uncheckedValue?: boolean | string | number;
  checkedColor?: string;
  uncheckedColor?: string;
};

export const switchEmits = {
  'update:modelValue': (value: boolean | string | number) => true,
  change: (value: boolean | string | number, ev: Event) => true,
};
