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

export const numberMatchReg = /[-]?(\d*\.\d+|\d+\.\d|\d+)/;
