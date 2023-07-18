import { PaginationProps, defaultPaginationProps } from '../pagination';

type NextProps = Pick<PaginationProps, 'disabled' | 'size'>;

type NextEmits = {
  (e: 'next'): void;
};

const defaultNextProps: NextProps = {
  disabled: defaultPaginationProps.disabled,
  size: defaultPaginationProps.size,
};

export { defaultNextProps };
export type { NextProps, NextEmits };
