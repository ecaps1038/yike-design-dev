// Type
export const TYPES = ['primary', 'secondary', 'outline'] as const;
export type Type = (typeof TYPES)[number];

// Size
export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type Size = (typeof SIZES)[number];
export enum SIZES_MAP {
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

// Layout
export const LAYOUT = ['horizontal', 'vertical', 'inline'] as const;
export type Layout = (typeof LAYOUT)[number];

// Shape
export const SHAPES = ['default', 'round', 'circle', 'square'] as const;
export type Shape = (typeof SHAPES)[number];

// Status
export const STATUS = ['success', 'warning', 'danger', 'primary'] as const;
export type Status = (typeof STATUS)[number];
export enum STATUS_MAP {
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  primary = 'primary',
}

// Message
export const MESSAGETYPE = [
  'success',
  'warning',
  'error',
  'primary',
  'loading',
] as const;
export type MessageType = (typeof MESSAGETYPE)[number];

// Notification
export const NOTIFICATIONTYPE = [
  'primary',
  'success',
  'warning',
  'error',
] as const;
export type NotificationType = (typeof NOTIFICATIONTYPE)[number];

// Skin
export const SKIN = ['auto', 'light', 'dark'] as const;
export type Skin = (typeof SKIN)[number];

// Title
export const TITLETYPE = [...STATUS, 'secondary'] as const;
export type TitleType = (typeof TITLETYPE)[number];

// Text
export const TEXTTYPE = [...TITLETYPE, 'third', 'disabled'] as const;
export type TextType = (typeof TEXTTYPE)[number];

// Direction
export const DIRECTION = ['vertical', 'horizontal'] as const;
export type Direction = (typeof DIRECTION)[number];

// Timeline
export const TIMELINE_TYPE = ['solid', 'dashed', 'dotted'] as const;
export type TimelineType = (typeof TIMELINE_TYPE)[number];

// Timeline Placement
export const TIMELINE_PLACEMENT = [
  'left',
  'right',
  'top',
  'bottom',
  'alternate',
] as const;
export type TimelinePlacement = (typeof TIMELINE_PLACEMENT)[number];

// Gap
export type GapSize = Size | number | [number, number];

// Animation
export type AnimationType = 'upward' | 'fade';
