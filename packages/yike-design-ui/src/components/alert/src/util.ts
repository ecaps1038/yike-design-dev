import type { Type } from "./alert";

/**
 * 根据类型获取对应的 Icon Name
 */
export const getIconName = (type: Type) =>
({
  success: 'yike-gou',
  info: 'yike-tixing',
  warning: 'yike-tixing',
  error: 'yike-cha',
}[type])
