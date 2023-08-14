import { InnerValidateOptions } from './../interface';
import Base from './base';

const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i',
);
const regexIp =
  /^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}$/;

class TypeValidator extends Base {
  constructor(obj: any, options: InnerValidateOptions) {
    super(obj, {
      ...options,
      type: 'type',
    });
  }

  get email() {
    this.type = 'email';
    return this.validate(
      this.obj === undefined || regexEmail.test(this.obj),
      this.getValidateMsg('type.email'),
    );
  }

  get url() {
    this.type = 'url';
    return this.validate(
      this.obj === undefined || regexUrl.test(this.obj),
      this.getValidateMsg('type.url'),
    );
  }

  get ip() {
    this.type = 'ip';
    return this.validate(
      this.obj === undefined || regexIp.test(this.obj),
      this.getValidateMsg('type.ip'),
    );
  }
}

export default TypeValidator;
