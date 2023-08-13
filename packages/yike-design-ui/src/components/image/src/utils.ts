import type { ZoomType } from './preview';

/** 并集，返回新的对象 */
export const omit = <T extends Record<any, any>, K extends keyof any>(
  object: T,
  path: Array<K>,
): Omit<T, K> => {
  const result = { ...object };

  for (const item of path) {
    if (item in result) {
      delete result[item];
    }
  }

  return result;
};

/** 交集，返回新的对象 */
export const pick = <T extends Record<any, any>, K extends keyof T>(
  object: T,
  path: Array<K>,
): Pick<T, K> => {
  const result: any = {};

  for (const item of path) {
    if (item in object && object[item]) {
      result[item] = object[item];
    }
  }

  return result;
};

/** 规格化图像大小比例 */
export const normalizeImageSizeProp = (size?: string | number) => {
  if (size === undefined) return undefined;
  if (typeof size === 'string' && /^\d+(%)$/.test(size)) return size;

  const num = parseInt(size as string, 10);
  return typeof num === 'number' ? `${num}px` : undefined;
};

/** 放大缩小的倍率 */
export const scaleAttr = [
  0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4,
  5,
] as const;

export const getScale = (
  cur: (typeof scaleAttr)[number] = 1,
  type: ZoomType = 'zoomIn',
) => {
  const index = scaleAttr.indexOf(cur);
  if (type === 'zoomIn') {
    return index === scaleAttr.length - 1 ? cur : scaleAttr[index + 1];
  }
  return index === 0 ? cur : scaleAttr[index - 1];
};

/** 避免浮点数计算误差问题 */
export const formatePercentage = (scale: (typeof scaleAttr)[number]) => {
  return (scale * 100).toFixed(0) + '%';
};

/** 获取挂载 */
export const getPopupContainer = (
  popupContainer?: string | HTMLElement,
): HTMLElement => {
  if (popupContainer) {
    if (typeof popupContainer === 'string')
      return document.querySelector(popupContainer) as HTMLElement;
    return popupContainer;
  }
  return document.body;
};
