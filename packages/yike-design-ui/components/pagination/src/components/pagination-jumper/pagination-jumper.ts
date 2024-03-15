import type { PaginationProps } from '../../pagination';

type JumperProps = Pick<
  PaginationProps,
  'current' | 'size' | 'simple' | 'disabled'
> & {
  totalPages: number;
};

type JumperEmits = {
  (e: 'jump', page: number): void;
};

export type { JumperProps, JumperEmits };
