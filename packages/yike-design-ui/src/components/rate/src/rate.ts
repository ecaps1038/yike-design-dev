import { SIZES, Size } from '../../../utils/constant';
import { PropType } from 'vue';

export const isValidSize = (val: string) => ['', ...SIZES].includes(val);

export const RateProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  id: {
    type: String,
    default: undefined,
  },
  max: {
    type: Number,
    default: 5,
  },
  disabled: {
    type: Boolean,
  },
  size: {
    type: String as PropType<Size>,
    default: SIZES[2],
    validator: isValidSize,
  },
} as const;

export const RateEmits = {
  change: (value: number) => value,
  'update:modelValue': (value: number) => value,
};
