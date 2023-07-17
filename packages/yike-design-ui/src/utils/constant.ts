export const TYPES = ['primary', 'secondary', 'outline'] as const;
export type Type = (typeof TYPES)[number];

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type Size = (typeof SIZES)[number];

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
