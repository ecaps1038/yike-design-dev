import type { Size } from '../../../utils/constant';

type Props = {
  current: number;
  disabled: boolean;
  fixWidth: boolean;
  pagerCount: number;
  simple: boolean;
  showJumper: boolean;
  size: Size;
  total: number;
};

const defaultPaginationProps: Props = {
  current: 1,
  disabled: false,
  fixWidth: false,
  pagerCount: 7,
  simple: false,
  showJumper: false,
  size: 'l',
  total: 0,
};

type PaginationEmits = {
  (e: 'update:current', value: number): void;
};
type PaginationProps = Partial<Props>;

export type { PaginationProps, PaginationEmits };
export { defaultPaginationProps };
