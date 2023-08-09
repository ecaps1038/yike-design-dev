import { InjectionKey } from 'vue';
import { SchemaType, SchemaRuleType } from '../../utils/validate';
export type Field = string;
export type ValidateStatus = 'success' | 'error' | 'primary';
export type FormProps = {
  model?: any;
  id?: string;
  rules?: SchemaType;
  labelWidth?: number;
  disabled?: boolean;
};
export type FormItemProps = {
  field?: Field;
  labelWidth?: number;
  label?: string;
  required?: boolean;
  rules?: SchemaRuleType | SchemaRuleType[];
  disabled?: boolean;
};

export type FormContext = {
  model: any;
  labelWidth?: number;
  disabled?: boolean;
  rules?: SchemaType;
  addField: (formItemInstance: FormItemInstance) => void;
  updateValidateState: (field: Field, formItemInstance: any) => void;
};

export type FormItemInstance = {
  field: string;
  isError?: boolean;
  message?: string;
  status: ValidateStatus;
  rules?: SchemaRuleType | SchemaRuleType[];
  validate: () => Promise<any>;
};

export type ValidateStatusMap = {
  [key: string]: FormItemInstance;
};

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey');

export interface ValidateError {
  message?: string;
  fieldValue?: any;
  field?: string;
}
