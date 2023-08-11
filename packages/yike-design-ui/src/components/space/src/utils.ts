import { CSSProperties } from 'vue';
import { GapSize, Direction, Align } from './space';
export const getMargin = (size: GapSize) => {
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
  dir: Direction,
): CSSProperties['flexDirection'] => {
  if (dir == 'vertical') {
    return 'column';
  } else {
    return 'row';
  }
};
//对齐方式
export const getAlign = (align: Align): string => {
  switch (align) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    case 'center':
      return 'center';
    case 'baseline':
      return 'baseline';
    default:
      return 'center';
  }
};
