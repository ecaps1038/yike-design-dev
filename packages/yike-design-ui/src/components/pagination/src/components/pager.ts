import type { Size } from '../../../../utils/constant';

type PagerProps = {
  current: number;
  disabled: boolean;
  pagerCount: number;
  total: number;
  size: Size;
};

type PagerEmits = {
  (e: 'click'): void;
};

const defaultPagerProps: PagerProps = {
  current: 1,
  disabled: false,
  pagerCount: 7,
  total: 0,
  size: 'l',
};

export type { PagerProps, PagerEmits };
export { defaultPagerProps };
