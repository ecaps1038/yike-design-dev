import {
  SchemaType,
  ValidateOptions,
  InnerValidateOptions,
  ValidateMessagesType,
  GlobalConfig,
} from './interface';
import { isArray, isObject } from './is';
import StringValidator from './rules/string';
import NumberValidator from './rules/number';
import ArrayValidator from './rules/array';
import ObjectValidator from './rules/object';
import BooleanValidator from './rules/boolean';
import TypeValidator from './rules/type';
import CustomValidator from './rules/custom';
import { mergeTemplate } from './util';

const BValidate = (obj: any, options: ValidateOptions) => {
  return new Validate(obj, { field: 'value', ...options });
};

BValidate.globalConfig = {} as GlobalConfig;

// 全局生效校验信息
BValidate.setGlobalConfig = (options: GlobalConfig) => {
  BValidate.globalConfig = options || {};
};

class Validate {
  number: NumberValidator;
  string: StringValidator;

  array: ArrayValidator;
  object: ObjectValidator;
  boolean: BooleanValidator;
  type: TypeValidator;
  custom: CustomValidator;

  constructor(obj: any, _options: InnerValidateOptions) {
    const globalConfig = BValidate.globalConfig;
    const options = {
      ...globalConfig,
      ..._options,
      validateMessages: mergeTemplate(
        globalConfig.validateMessages,
        _options.validateMessages,
      ),
    };
    this.string = new StringValidator(obj, options);
    this.number = new NumberValidator(obj, options);
    this.array = new ArrayValidator(obj, options);
    this.object = new ObjectValidator(obj, options);
    this.boolean = new BooleanValidator(obj, options);
    this.type = new TypeValidator(obj, options);
    this.custom = new CustomValidator(obj, options);
  }
}

export class Schema {
  schema: SchemaType;
  options: ValidateOptions;

  constructor(schema: SchemaType, options: ValidateOptions = {}) {
    this.schema = schema;
    this.options = options;
  }

  // 更新校验信息
  messages(validateMessages: ValidateMessagesType) {
    this.options = {
      ...this.options,
      validateMessages: mergeTemplate(
        this.options.validateMessages,
        validateMessages,
      ),
    };
  }

  validate(values: { [key: string]: any }, callback: any) {
    if (!isObject(values)) {
      return;
    }
    const promises: any = [];
    let errors: any = null;
    function setError(key: string, error: any) {
      if (!errors) {
        errors = {};
      }
      if (!errors[key] || error.requiredError) {
        errors[key] = error;
      }
    }
    if (this.schema) {
      Object.keys(this.schema).forEach((key) => {
        if (isArray(this.schema[key])) {
          for (let i = 0; i < this.schema[key].length; i++) {
            const rule: any = this.schema[key][i];
            const type: any = rule.type;
            const message = rule.message;
            if (!type && !rule.validator) {
              throw `You must specify a type to field ${key}!`;
            }
            const _options = {
              ...this.options,
              message,
              field: key,
            };
            if ('ignoreEmptyString' in rule) {
              _options.ignoreEmptyString = rule.ignoreEmptyString;
            }
            if ('strict' in rule) {
              _options.strict = rule.strict;
            }

            const validator: any = new Validate(values[key], _options);
            let bv = validator.type[type as keyof TypeValidator] || null;
            if (!bv) {
              if (rule.validator) {
                bv = validator.custom.validate(rule.validator);
                if (
                  Object.prototype.toString.call(bv) === '[object Array]' &&
                  bv[0].then
                ) {
                  promises.push({
                    function: bv[0],
                    _this: bv[1],
                    key,
                  });
                } else if (bv) {
                  setError(key, bv);
                }
                continue;
              } else {
                bv = validator[type];
              }
            }
            Object.keys(rule).forEach((r) => {
              if (rule.required) {
                bv = bv.isRequired;
              }
              if (
                r !== 'message' &&
                bv[r] &&
                rule[r] &&
                typeof bv[r] === 'object'
              ) {
                bv = bv[r];
              }
              if (
                bv[r] &&
                rule[r] !== undefined &&
                typeof bv[r] === 'function'
              ) {
                bv = bv[r](rule[r]);
              }
            });
            bv.collect((error: any) => {
              if (error) {
                setError(key, error);
              }
            });
            if (errors) {
              break;
            }
          }
        }
      });
    }
    if (promises.length > 0) {
      Promise.all(promises.map((a: any) => a.function)).then(() => {
        promises.forEach((promise: any) => {
          if (promise._this.error) {
            setError(promise.key, promise._this.error);
          }
        });
        callback && callback(errors);
      });
    } else {
      callback && callback(errors);
    }
  }
}

export type {
  SchemaType,
  SchemaRuleType,
  ValidateOptions,
  ValidateMessagesType,
  ValidateMessagesTemplateType,
} from './interface';

export { default as DefaultValidateMessage } from './message';

export default BValidate;
