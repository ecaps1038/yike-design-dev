import { usePropsConfig } from '../utils';

const PrevProps = usePropsConfig('disabled', 'size');

type PrevEmits = {
  (e: 'prev'): void;
};

export type { PrevEmits };
export { PrevProps };
