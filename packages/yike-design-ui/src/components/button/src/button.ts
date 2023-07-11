import { PropType, ExtractPropTypes } from "vue"
import { ROUNDS, Round, SIZES, STATUS, Size, Status, TYPES, Type } from '../../../utils/constant'

export const buttonProps = {
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
  shape: {
    type: String as PropType<Round>,
    default: null,
    required: true,
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

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;