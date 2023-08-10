import { InjectionKey } from 'vue';
import { SchemaType, SchemaRuleType } from '../../utils/validate';
export type Field = string;
export type ValidateStatus = 'success' | 'error' | 'primary';
export interface FormProps {
  model?: any;
  id?: string;
  rules?: SchemaType;
  labelWidth?: number;
  disabled?: boolean;
}
export type FormItemProps = {
  field?: Field;
  labelWidth?: number;
  label?: string;
  required?: boolean;
  rules?: SchemaRuleType[];
  disabled?: boolean;
};

export interface FormContext {
  model: any;
  labelWidth: number;
  disabled: boolean;
  rules: SchemaType | undefined;
  addField: (formItemInstance: FormItemInstance) => void;
  updateValidateState: (field: Field, formItemInstance: any) => void;
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey');

export interface FormItemContext {
  validateInstance: any;
  disabled: boolean | undefined;
}

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey');

export interface FormItemStatus {
  status: ValidateStatus;
  isError: boolean;
  message: string;
}

export interface FormItemInstance {
  field: string;
  isError?: boolean;
  message?: string;
  status?: ValidateStatus;
  rules?: SchemaRuleType[];
  validate: () => Promise<any>;
  resetValidate: () => void;
}

export type ValidateStatusMap = {
  [key: string]: FormItemInstance;
};
