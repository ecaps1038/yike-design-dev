import { Size } from '../../utils';

export const getSize = (size: Size): number => {
  switch (size) {
    case 's':
      return 12;
    case 'm':
      return 14;
    case 'l':
      return 14;
    case 'xl':
      return 16;
    default:
      return 16;
  }
};
