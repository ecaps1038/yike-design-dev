import { Size, isNumber, Status } from '../../utils';

type SpinnerSize = Size | number;
const SNIPPER_COLOR = ['primary', 'error', 'success', 'warning'];

export type SpinnerProps = {
  size?: SpinnerSize;
  color?: string;
  strokeWidth?: number;
};

const sizes = {
  s: 24,
  m: 32,
  l: 36,
  xl: 48,
};

export const resolveSize = (value: SpinnerSize): number => {
  if (isNumber(value)) {
    return value;
  }
  return sizes[value] ?? 16;
};

export const resolveColor = (val: string): string => {
  if (val.startsWith('var(')) {
    return val;
  }
  if (SNIPPER_COLOR.includes(val as Status)) {
    return `rgb(var(--${val.slice(0, 1)}color))`;
  }
  return val;
};
