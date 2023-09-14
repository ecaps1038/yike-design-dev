export const defaultFormatter = (value: number): string => {
  return value.toString();
};

export const calculate = (value: number, step: number, precision: number) => {
  if (Number.isInteger(value) && Number.isInteger(step)) {
    const sum = value + step;
    if (precision === 0) {
      return sum;
    }
  }
  const valueDigits = value.toString().split('.')[1] ?? '';
  const stepDigits = step.toString().split('.')[1] ?? '';
  let digits = Math.max(valueDigits.length, stepDigits.length);
  if (digits > precision) {
    digits = precision;
  }
  const power = 10 ** digits;
  const result = (value * power + step * power) / power;
  return result;
};

export const clearInvalidChar = (value: string) =>
  value ? (value.match(numberMatchReg) ?? ['0'])[0] : '0';

export const normalizeNumber = (value: number, precision: number) => {
  const vArray = value.toString().split('.');
  const vInteger = vArray[0];
  let vDigit = vArray[1] ?? '';

  if (vDigit.length > precision) {
    vDigit = vDigit.slice(0, precision);
    return Number(`${vInteger}.${vDigit}`);
  } else {
    return value;
  }
};

export const numberMatchReg = /[-]?(\d*\.\d+|\d+\.\d|\d+)/;
