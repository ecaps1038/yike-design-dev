export const calculate = (value: number, step: number, precision: number) => {
  if (Number.isInteger(value) && Number.isInteger(step)) {
    const sum = value + step;
    if (precision === 0) {
      return sum;
    }
  }
  const valueDigits = value.toString().split('.')[1] ?? '';
  const stepDigits = step.toString().split('.')[1] ?? '';
  const digits = Math.max(valueDigits.length ?? 0, stepDigits.length ?? 0);
  const power = 10 ** digits;
  return (value * power + step * power) / power;
};

export const normalizeNumber = (value: number, precision: number) => {
  if (!value || Number.isNaN(value)) return 0;
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
