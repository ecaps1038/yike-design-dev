import { PaginationProps, defaultPaginationProps } from '../pagination';

type JumperProps = Pick<PaginationProps, 'size' | 'disabled'> & {
  label: string;
};

type JumperEmits = {
  (e: 'jump', value: number): void;
};

const defaultJumperProps: JumperProps = {
  disabled: defaultPaginationProps.disabled,
  label: '前往',
  size: defaultPaginationProps.size,
};

export type { JumperProps, JumperEmits };
export { defaultJumperProps };
