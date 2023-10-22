import type { Type } from './alert';

/**
 * 根据类型获取对应的 Icon Name
 */
export function getIconName(type: Type) {
  return {
    success: 'IconTickFill',
    info: 'IconReminderFill',
    warning: 'IconWarningFill',
    error: 'IconCrossFill',
  }[type];
}
