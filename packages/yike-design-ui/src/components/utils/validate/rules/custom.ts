import {
  InnerValidateOptions,
  ValidatorError,
  CustomValidatorType,
} from './../interface';
import Base from './base';

class CustomValidator extends Base {
  constructor(obj: any, options: InnerValidateOptions) {
    super(obj, {
      ...options,
      type: 'custom',
    });
  }
  // Override the `validate` method
  validate(): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    return function (
      validator: CustomValidatorType,
      callback?: (message?: ValidatorError | null) => void,
    ) {
      let ret;
      if (validator) {
        ret = validator(_this.obj, _this.addError.bind(_this));
        if (ret && ret.then) {
          if (callback) {
            ret.then(
              () => {
                callback && callback(_this.error);
              },
              (e: Error) => {
                console.error(e);
              },
            );
          }
          return [ret, _this];
        } else {
          callback && callback(_this.error);
          return _this.error;
        }
      }
    };
  }
}

export default CustomValidator;
