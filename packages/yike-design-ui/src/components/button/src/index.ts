import { PropType } from "vue"

export const TYPES = [
  'primary',
  'sceondary',
  'outline',
  'undefined',
] as const;
export type Type = (typeof TYPES)[number]

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type Size = (typeof SIZES)[number]

export const ROUNDS = ['round', 'circle', 'square'] as const;
export type Round = (typeof ROUNDS)[number]

export const STATUS = ['success', 'warning', 'danger'] as const;
export type Status = typeof STATUS[number]

const ButtonProps = {
  type: {
    type: String as PropType<Type>,
    default: 'primary',
    vildate(value: Type) {
      return TYPES.includes(value)
    },
  },
  status: {
    type: String as PropType<Type>,
    default: '',
    vildate(value: Status) {
      return STATUS.includes(value)
    },
  },
  size: {
    type: String as PropType<Size>,
    default: 'l',
    vildate(value: Size) {
      return SIZES.includes(value)
    },
  },
  round: {
    type: String as PropType<Round>,
    default: '',
    vildate(value: Round) {
      return ROUNDS.includes(value)
    },
  },
  long: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
} as const;

export default ButtonProps;