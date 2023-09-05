import type { Status } from './progress';
import type { Size } from '../../utils';
export type PSize = Exclude<Size, 'xl'>;

/**
 * 根据状态获取对应的 Icon Name
 */
export const getIconName: (status: Status, isLinear?: boolean) => string = (
  status: Status,
  isLinear?: boolean,
) =>
  ({
    normal: '',
    success: isLinear ? 'IconTickOutline' : 'IconTickFill',
    error: isLinear ? 'IconCloseOutline' : 'IconCrossFill',
  }[status]);

/**
 * 根据size获取对应的 svg大小
 */
export const getSvgSize: (size: PSize) => string[] = (size: PSize) =>
  ({
    s: ['4', '64'],
    m: ['6', '80'],
    l: ['8', '108'],
  }[size]);
