import type { PaginationProps } from '../../pagination';

type PagerProps = Pick<
  PaginationProps,
  'total' | 'pagerCount' | 'fixWidth' | 'simple'
> & {
  current: number;
};

type PagerEmits = {
  (e: 'change', current: number): void;
};

export type { PagerProps, PagerEmits };
