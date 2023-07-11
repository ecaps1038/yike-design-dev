export const TYPES = [
  'primary',
  'secondary',
  'outline',
] as const;
export type Type = (typeof TYPES)[number]

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type Size = (typeof SIZES)[number]

export const SHAPES = ['round', 'circle', 'square'] as const;
export type Shape = (typeof SHAPES)[number]

export const STATUS = ['success', 'warning', 'danger', 'primary'] as const;
export type Status = (typeof STATUS)[number]

export const MESSAGETYPE = ['success', 'info', 'warning', 'error'] as const
export type MessageType = (typeof MESSAGETYPE)[number]