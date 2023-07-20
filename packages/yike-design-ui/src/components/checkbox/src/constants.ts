import { InjectionKey, ToRefs, WritableComputedRef } from 'vue';
// type CheckboxGroupContext = {
//   modelValue?: WritableComputedRef<any>;
//   changeEvent?: (...args: any) => any;
// } & ToRefs<
//   Pick<
//     CheckboxGroupProps,
//     'size' | 'min' | 'max' | 'disabled' | 'validateEvent' | 'fill' | 'textColor'
//   >
// >;
type CheckboxGroupContext = {
  name: string;
  calcVal: Array<string | number | boolean>;
  disabled: boolean;
  handleChange: (val: Array<string | number>) => void;
};
export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('checkboxGroupContextKey');
