const opt = Object.prototype.toString;

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]';
}

export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]';
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]';
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

export function isRegExp(obj: any): obj is RegExp {
  return opt.call(obj) === '[object RegExp]';
}

export function isBoolean(obj: any): obj is boolean {
  return opt.call(obj) === '[object Boolean]';
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return opt.call(obj) === '[object Function]';
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isEmptyValue(obj: any): boolean {
  return obj === undefined || obj === null || obj === '';
}

export function isEmptyArray(obj: any): boolean {
  return isArray(obj) && !obj.length;
}

export const isEqual = (obj: any, other: any): boolean => {
  if (typeof obj !== 'object' || typeof other !== 'object') {
    return obj === other;
  }
  if (isFunction(obj) && isFunction(other)) {
    return obj === other || obj.toString() === other.toString();
  }

  if (Object.keys(obj).length !== Object.keys(other).length) {
    return false;
  }
  for (const key in obj) {
    const result = isEqual(obj[key], other[key]);
    if (!result) return false;
  }
  return true;
};
