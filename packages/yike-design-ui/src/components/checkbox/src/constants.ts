import { InjectionKey } from 'vue';

type CheckboxGroupContext = {
  name: string;
  calcVal: Array<string | number | boolean>;
  disabled?: boolean;
  handleChange: (val: Array<string | number>) => void;
  isMax: boolean;
};
export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('checkboxGroupContextKey');
