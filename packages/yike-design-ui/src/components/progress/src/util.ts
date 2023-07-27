import type { Status } from './progress';
import type { Size } from '../../../utils/constant';
/**
 * 根据状态获取对应的 Icon 颜色
 */
export const getIconColor = (type: Status) =>
  ({
    success: '#1fb4a2',
    error: '#fa5247',
    normal: '#2B5AED',
  }[type]);

/**
 * 根据状态获取对应的 Icon Name
 */
export const getIconName = (type: Status) =>
  ({
    success: 'yike-gou',
    error: 'yike-cha',
  }[type]);

/**
 * 根据状态获取对应的 Icon Name
 */
export const getSvgSize = (Size: Size) =>
  ({
    s: 48,
    m: 64,
    l: 80,
  }[Size]);
