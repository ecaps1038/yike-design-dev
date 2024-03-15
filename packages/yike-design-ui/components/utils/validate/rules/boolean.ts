import { InnerValidateOptions } from '../interface';
import Base from './base';
import { isBoolean } from '../is';

class BooleanValidator extends Base {
  constructor(obj: any, options: InnerValidateOptions) {
    super(obj, {
      ...options,
      type: 'boolean',
    });
    this.validate(
      options && options.strict ? isBoolean(this.obj) : true,
      this.getValidateMsg('type.boolean'),
    );
  }

  get true() {
    return this.validate(
      this.obj === true,
      this.getValidateMsg('boolean.true'),
    );
  }

  get false() {
    return this.validate(
      this.obj === false,
      this.getValidateMsg('boolean.false'),
    );
  }
}

export default BooleanValidator;
