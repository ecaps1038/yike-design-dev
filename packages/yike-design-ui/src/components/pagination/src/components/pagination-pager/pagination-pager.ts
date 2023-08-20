import type { PaginationProps } from '../../pagination';

type PagerProps = Pick<
  PaginationProps,
  'pagerCount' | 'fixWidth' | 'simple' | 'disabled' | 'size'
> & {
  totalPages: number;
  current: number;
  pageSize: number;
};

type PagerEmits = {
  (e: 'change', current: number): void;
};

export type { PagerProps, PagerEmits };
