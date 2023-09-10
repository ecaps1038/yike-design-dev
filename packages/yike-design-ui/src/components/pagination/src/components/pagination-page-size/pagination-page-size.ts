import type { PaginationProps } from '../../pagination';

type PageSizeProps = Pick<
  PaginationProps,
  'size' | 'disabled' | 'defaultPageSize' | 'pageSizeOptions'
>;
type PageSizeEmits = {
  (e: 'pageSizeChange', pageSize: number): void;
};

export type { PageSizeProps, PageSizeEmits };
