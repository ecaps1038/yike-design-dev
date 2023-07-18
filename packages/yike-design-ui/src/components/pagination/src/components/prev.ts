import { PaginationProps, defaultPaginationProps } from '../pagination';

type PrevProps = Pick<PaginationProps, 'disabled' | 'size'>;

type PrevEmits = {
  (e: 'prev'): void;
};

const defaultPrevProps: PrevProps = {
  disabled: defaultPaginationProps.disabled,
  size: defaultPaginationProps.size,
};

export { defaultPrevProps };
export type { PrevProps, PrevEmits };
