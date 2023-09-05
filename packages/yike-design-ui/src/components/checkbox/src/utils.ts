import { CSSProperties } from 'vue';
import { CheckboxGroupProps } from './checkbox-group';

export const toBoolean = (v: number | string | boolean) => {
  if (typeof v === 'boolean') return v;

  return !!v.toString();
};
export const isArray = (v: any): v is any[] => {
  return Array.isArray(v);
};
export const isUndefined = (v: any) => {
  return typeof v === 'undefined';
};

export const getMargin = (size: CheckboxGroupProps['gap']) => {
  if (typeof size === 'number') {
    return size;
  }
  switch (size) {
    case 's':
      return 4;
    case 'm':
      return 8;
    case 'l':
      return 16;
    case 'xl':
      return 24;
    default:
      return 16;
  }
};

//排列方式
export const flexDirection = (
  dir: CheckboxGroupProps['direction'],
): CSSProperties['flexDirection'] => {
  if (dir == 'vertical') {
    return 'column';
  } else {
    return 'row';
  }
};
