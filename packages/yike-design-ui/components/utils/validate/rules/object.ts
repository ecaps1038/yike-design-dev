import { InnerValidateOptions } from '../interface';
import Base from './base';
import { isObject, isEmptyObject, isEqual } from '../is';

class ObjectValidator extends Base {
  constructor(obj: any, options: InnerValidateOptions) {
    super(obj, {
      ...options,
      type: 'object',
    });
    this.validate(
      options && options.strict ? isObject(this.obj) : true,
      this.getValidateMsg('type.object'),
    );
  }

  deepEqual(other: any) {
    return this.obj
      ? this.validate(
          isEqual(this.obj, other),
          this.getValidateMsg('object.deepEqual', { deepEqual: other }),
        )
      : this;
  }

  hasKeys(keys: string[]) {
    return this.obj
      ? this.validate(
          keys.every((el) => this.obj[el]),
          this.getValidateMsg('object.hasKeys', { keys }),
        )
      : this;
  }

  get empty() {
    return this.validate(
      isEmptyObject(this.obj),
      this.getValidateMsg('object.empty'),
    );
  }
}

export default ObjectValidator;
