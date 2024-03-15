import { InnerValidateOptions } from '../interface';
import Base from './base';
import { isEmptyValue, isNumber } from '../is';

class NumberValidator extends Base {
  constructor(obj: any, options: InnerValidateOptions) {
    super(obj, {
      ...options,
      type: 'number',
    });
    this.validate(
      options && options.strict ? isNumber(this.obj) : true,
      this.getValidateMsg('type.number'),
    );
  }

  min(num: number) {
    return !isEmptyValue(this.obj)
      ? this.validate(
          this.obj >= num,
          this.getValidateMsg('number.min', { min: num }),
        )
      : this;
  }

  max(num: number) {
    return !isEmptyValue(this.obj)
      ? this.validate(
          this.obj <= num,
          this.getValidateMsg('number.max', { max: num }),
        )
      : this;
  }

  equal(num: number) {
    return !isEmptyValue(this.obj)
      ? this.validate(
          this.obj === num,
          this.getValidateMsg('number.equal', { equal: num }),
        )
      : this;
  }

  range(min: number, max: number) {
    return !isEmptyValue(this.obj)
      ? this.validate(
          this.obj >= min && this.obj <= max,
          this.getValidateMsg('number.range', { min, max }),
        )
      : this;
  }

  get positive(): NumberValidator {
    return !isEmptyValue(this.obj)
      ? this.validate(this.obj > 0, this.getValidateMsg('number.positive'))
      : this;
  }

  get negative(): NumberValidator {
    return !isEmptyValue(this.obj)
      ? this.validate(this.obj < 0, this.getValidateMsg('number.negative'))
      : this;
  }
}

export default NumberValidator;
