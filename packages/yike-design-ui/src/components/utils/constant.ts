export const TYPES = ['primary', 'secondary', 'outline'] as const;
export type Type = (typeof TYPES)[number];

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type Size = (typeof SIZES)[number];

export const LAYOUT = ['horizontal', 'vertical', 'inline'] as const;
export type Layout = (typeof LAYOUT)[number];

export const SHAPES = ['default', 'round', 'circle', 'square'] as const;
export type Shape = (typeof SHAPES)[number];

export const STATUS = ['success', 'warning', 'danger', 'primary'] as const;
export type Status = (typeof STATUS)[number];

export const MESSAGETYPE = [
  'success',
  'warning',
  'error',
  'primary',
  'loading',
] as const;
export type MessageType = (typeof MESSAGETYPE)[number];

export const NOTIFICATIONTYPE = [
  'primary',
  'success',
  'warning',
  'error',
] as const;
export type NotificationType = (typeof NOTIFICATIONTYPE)[number];

export const SKIN = ['auto', 'light', 'dark'] as const;
export type Skin = (typeof SKIN)[number];

export const TITLETYPE = [...STATUS, 'secondary', 'default'] as const;
export type TitleType = (typeof TITLETYPE)[number];

export const TEXTTYPE = [
  ...STATUS,
  'secondary',
  'default',
  'third',
  'disabled',
] as const;
export type TextType = (typeof TEXTTYPE)[number];

export const DIRECTION = ['vertical', 'horizontal'] as const;
export type Direction = (typeof DIRECTION)[number];
export type AnimationType = 'upward' | 'fade';

export const TIMELINE_PLACEMENT = [
  'left',
  'right',
  'top',
  'bottom',
  'alternate',
] as const;
export type TimelinePlacement = (typeof TIMELINE_PLACEMENT)[number];

export const TIMELINE_TYPE = ['solid', 'dashed', 'dotted'] as const;
export type TimelineType = (typeof TIMELINE_TYPE)[number];
