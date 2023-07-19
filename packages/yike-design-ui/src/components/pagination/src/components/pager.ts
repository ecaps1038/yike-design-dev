import { PaginationProps, defaultPaginationProps } from '../pagination';

type PagerProps = Pick<
  PaginationProps,
  'current' | 'disabled' | 'fixWidth' | 'pagerCount' | 'total' | 'size'
>;

type PagerEmits = {
  (e: 'update:current', current: number): void;
};

const defaultPagerProps: PagerProps = defaultPaginationProps;

export type { PagerProps, PagerEmits };
export { defaultPagerProps };
