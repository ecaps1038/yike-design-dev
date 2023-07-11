export const TYPES = [
  'primary',
  'secondary',
  'outline',
  'undefined',
] as const;
export type Type = (typeof TYPES)[number]

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type Size = (typeof SIZES)[number]

export const SHAPES = ['round', 'circle', 'square'] as const;
export type Shape = (typeof SHAPES)[number]

export const STATUS = ['success', 'warning', 'danger'] as const;
export type Status = typeof STATUS[number]