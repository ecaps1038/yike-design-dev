import type { Size } from '../../../utils/constant';

type Props = {
  current: number;
  defaultPageSize: number;
  simple: boolean;
  size: Size;
  total: number;
};
type PaginationProps = Partial<Props>;
type PaginationEmits = {
  (e: 'update:current', value: number): void;
};

const defaultProps: Props = {
  current: 1,
  defaultPageSize: 10,
  simple: false,
  size: 'l',
  total: 0,
};

const paginationClassName = 'yk-pagination';

export { defaultProps, paginationClassName };
export type { PaginationProps, PaginationEmits };
