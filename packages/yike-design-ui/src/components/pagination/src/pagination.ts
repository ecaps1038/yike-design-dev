import type { Size } from '../../utils';
import type { InjectionKey } from 'vue';

const PAGINATION_CSS_NAMESPACE: InjectionKey<'pagination'> =
  Symbol('pagination');

interface PaginationProps {
  total: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  disabled?: boolean;
  pagerCount?: number;
  pageSizeOptions?: number[];
  size?: Size;
  simple?: boolean;
  showTotal?: boolean;
  showJumper?: boolean;
  showPageSize?: boolean;
  current?: number;
  fixWidth?: boolean;
  pageSize?: number;
}

type PaginationEmits = {
  (e: 'update:current', value: number): void;
  (e: 'change', current: number): void;
  (e: 'pageSizeChange', pageSize: number): void;
};

export type { PaginationEmits, PaginationProps };
export { PAGINATION_CSS_NAMESPACE };
