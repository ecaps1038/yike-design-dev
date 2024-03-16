import { InnerValidateOptions } from '../interface';
import Base from './base';
import { isString } from '../is';

class StringValidator extends Base {
  constructor(obj: any, options: InnerValidateOptions) {
    super(obj, {
      ...options,
      type: 'string',
    });
    this.validate(
      options && options.strict ? isString(this.obj) : true,
      this.getValidateMsg('type.string'),
    );
  }

  maxLength(length: number) {
    return this.obj
      ? this.validate(
          this.obj.length <= length,
          this.getValidateMsg('string.maxLength', { maxLength: length }),
        )
      : this;
  }

  minLength(length: number) {
    return this.obj
      ? this.validate(
          this.obj.length >= length,
          this.getValidateMsg('string.minLength', { minLength: length }),
        )
      : this;
  }

  length(length: number) {
    return this.obj
      ? this.validate(
          this.obj.length === length,
          this.getValidateMsg('string.length', { length }),
        )
      : this;
  }

  match(pattern: RegExp) {
    const isRegex = pattern instanceof RegExp;
    if (isRegex) {
      pattern.lastIndex = 0;
    }
    return this.validate(
      this.obj === undefined || (isRegex && pattern.test(this.obj)),
      this.getValidateMsg('string.match', { pattern }),
    );
  }

  get uppercase(): StringValidator {
    return this.obj
      ? this.validate(
          this.obj.toUpperCase() === this.obj,
          this.getValidateMsg('string.uppercase'),
        )
      : this;
  }

  get lowercase(): StringValidator {
    return this.obj
      ? this.validate(
          this.obj.toLowerCase() === this.obj,
          this.getValidateMsg('string.lowercase'),
        )
      : this;
  }
}

export default StringValidator;
