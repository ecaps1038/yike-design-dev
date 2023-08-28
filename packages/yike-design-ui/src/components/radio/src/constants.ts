import { InjectionKey } from 'vue';
import { RadioGroupProps } from './radio-group';

export const UPDATE_MODEL_EVENT = 'update:modelValue';
export const CHANGE_EVENT = 'change';

export interface RadioGroupContext extends RadioGroupProps {
  changeEvent: (val: RadioGroupProps['modelValue']) => void;
}

export const provideKey: InjectionKey<RadioGroupContext> =
  Symbol('propsByRadioGroup');
