import ValidateMessages from './message';

export type ValidateMessagesTemplateType = typeof ValidateMessages;

export type ValidateMessagesType = Partial<{
  [key in keyof ValidateMessagesTemplateType]: ValidateMessagesTemplateType[key] extends string
    ? ValidateMessagesTemplateType[key]
    : Record<
        keyof ValidateMessagesTemplateType[key],
        string | ((info: any) => any)
      >;
}>;

export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'url'
  | 'email'
  | 'ip'
  | 'type'
  | 'custom';

export type GlobalConfig = Pick<
  ValidateOptions,
  'strict' | 'trim' | 'ignoreEmptyString' | 'validateMessages'
>;

export type ValidateOptions = {
  // 是否对数据进行类型校验，如 bv('1', {strict: true}).number.end 会校验 ‘1’ 是否为数字类型。
  strict?: boolean;
  // 是否对数据值进行 trim 后进入校验逻辑
  trim?: boolean;
  // 是否忽略空字符串，即认为空字符串等同于 undefined
  ignoreEmptyString?: boolean;
  message?: any;
  type?: RuleType;
  validateMessages?: ValidateMessagesType;
};

export type InnerValidateOptions = ValidateOptions & {
  field?: string;
};

export type CustomValidatorType = (
  value: any,
  callback: (message?: any) => void,
) => Promise<void> | void;

export type SchemaRuleType = {
  required?: boolean;
  message?: any;
  validator?: CustomValidatorType;
  type?: RuleType;
  // boolean
  true?: boolean;
  false?: boolean;
  deepEqual?: any; // object or array
  hasKeys?: string[]; // object
  empty?: boolean; // object or array
  includes?: any; // array
  maxLength?: number; // string or array
  minLength?: number; // string or array
  pattern?: RegExp;
  length?: number; // string or array
  uppercase?: boolean;
  lowercase?: boolean;
  // number
  min?: number;
  max?: number;
  equal?: number;
  positive?: boolean;
  negative?: boolean;

  ignoreEmptyString?: boolean;
  strict?: boolean;
  trigger?: string | string[];
};

export type SchemaType = {
  [key: string]: SchemaRuleType[];
};

export type ValidatorError = {
  value: any;
  type: ValidateOptions['type'];
  requiredError?: boolean;
  message?: any;
};
