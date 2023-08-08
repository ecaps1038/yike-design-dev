import type { Size } from '../../utils/constant';
import type { PropType } from 'vue';
import { JumperProps, PrevProps, NextProps, PagerProps } from './components';

const PaginationProps = {
  current: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fixWidth: {
    type: Boolean,
    default: false,
  },
  jumperLabel: {
    type: String,
    default: '前往',
  },
  pagerCount: {
    type: Number,
    default: 7,
  },
  simple: {
    type: Boolean,
    default: false,
  },
  showJumper: {
    type: Boolean,
    default: false,
  },
  showTotal: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<Size>,
    default: 'l',
  },
  total: {
    type: Number,
    default: 0,
  },
};

type PaginationEmits = {
  (e: 'update:current', value: number): void;
};

type SubComponentProps =
  | typeof JumperProps
  | typeof PrevProps
  | typeof NextProps
  | typeof PagerProps;

export type { PaginationEmits, SubComponentProps };
export { PaginationProps };
