import {
  ValidatorError,
  ValidateOptions,
  InnerValidateOptions,
  ValidateMessagesTemplateType,
} from './../interface';
import {
  isObject,
  isString,
  isEmptyValue,
  isFunction,
  isEmptyArray,
  isArray,
} from '../is';
import { getTemplate, mergeTemplate } from '../util';
import validateMessages from '../message';

/**
 * @param options.trim trim string value
 * @param options.ignoreEmptyString used form type
 * @param options.message
 * @param options.type
 */
class Base {
  obj: any;
  message: ValidateOptions['message'];
  type: ValidateOptions['type'];
  error: null | ValidatorError;
  _not?: boolean;
  validateMessages: ValidateMessagesTemplateType;
  field?: string;

  constructor(obj: any, options: InnerValidateOptions) {
    if (isObject(options) && isString(obj) && options.trim) {
      this.obj = obj.trim();
    } else if (isObject(options) && options.ignoreEmptyString && obj === '') {
      this.obj = undefined;
    } else {
      this.obj = obj;
    }
    this.message = options.message;
    this.type = options.type;
    this.error = null;
    this.field = options.field || options.type;
    this.validateMessages = mergeTemplate(
      validateMessages,
      options.validateMessages,
    );
  }

  get not() {
    this._not = !this._not;
    return this;
  }

  get isRequired() {
    if (isEmptyValue(this.obj) || isEmptyArray(this.obj)) {
      const message = this.getValidateMsg('required');
      this.error = {
        value: this.obj,
        type: this.type,
        requiredError: true,
        message:
          this.message ||
          (isObject(message)
            ? message
            : `${this._not ? '[NOT MODE]:' : ''}${message}`),
      };
    }
    return this;
  }

  get end() {
    return this.error;
  }

  addError(message: any) {
    if (!this.error && message) {
      this.error = {
        value: this.obj,
        type: this.type,
        message:
          this.message ||
          (isObject(message)
            ? message
            : `${this._not ? '[NOT MODE]:' : ''}${message}`),
      };
    }
  }

  getValidateMsg = (keyPath: string, info: any = {}): any => {
    const data = {
      ...info,
      value: this.obj,
      field: this.field,
      type: this.type,
    };
    const template = getTemplate(this.validateMessages, keyPath);

    if (isFunction(template)) {
      return template(data);
    }
    if (isString(template)) {
      return template.replace(/\#\{.+?\}/g, (variable) => {
        const key = variable.slice(2, -1);
        if (key in data) {
          if (isObject(data[key]) || isArray(data[key])) {
            try {
              return JSON.stringify(data[key]);
            } catch (_) {
              return data[key];
            }
          }
          return String(data[key]);
        }
        return variable;
      });
    }
    return template;
  };

  validate(expression: boolean, errorMessage: any) {
    const _expression = this._not ? expression : !expression;
    if (_expression) {
      this.addError(errorMessage);
    }
    return this;
  }

  collect(callback: (error: null | ValidatorError) => void) {
    callback && callback(this.error);
  }
}

export default Base;
