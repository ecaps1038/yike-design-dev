import type { PaginationProps } from '../../pagination';

type JumperProps = Pick<
  PaginationProps,
  'current' | 'total' | 'size' | 'simple'
>;

export type { JumperProps };
