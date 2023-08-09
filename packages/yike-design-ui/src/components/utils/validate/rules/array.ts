import { InnerValidateOptions } from './../interface';
import Base from './base';
import { isArray, isEmptyArray, isEqual } from '../is';

class ArrayValidator extends Base {
  constructor(obj: any, options: InnerValidateOptions) {
    super(obj, {
      ...options,
      type: 'array',
    });
    this.validate(
      options && options.strict ? isArray(this.obj) : true,
      this.getValidateMsg('type.array', { value: this.obj, type: this.type }),
    );
  }

  length(num: number) {
    return this.obj
      ? this.validate(
          this.obj.length === num,
          this.getValidateMsg('array.length', { value: this.obj, length: num }),
        )
      : this;
  }

  minLength(num: number) {
    return this.obj
      ? this.validate(
          this.obj.length >= num,
          this.getValidateMsg('array.minLength', {
            value: this.obj,
            minLength: num,
          }),
        )
      : this;
  }

  maxLength(num: number) {
    return this.obj
      ? this.validate(
          this.obj.length <= num,
          this.getValidateMsg('array.maxLength', {
            value: this.obj,
            maxLength: num,
          }),
        )
      : this;
  }

  includes(arrays: number[]) {
    return this.obj
      ? this.validate(
          arrays.every((el) => this.obj.indexOf(el) !== -1),
          this.getValidateMsg('array.includes', {
            value: this.obj,
            includes: arrays,
          }),
        )
      : this;
  }

  deepEqual(other: number[]) {
    return this.obj
      ? this.validate(
          isEqual(this.obj, other),
          this.getValidateMsg('array.deepEqual', {
            value: this.obj,
            deepEqual: other,
          }),
        )
      : this;
  }

  get empty() {
    return this.validate(
      isEmptyArray(this.obj),
      this.getValidateMsg('array.empty', { value: this.obj }),
    );
  }
}

export default ArrayValidator;
