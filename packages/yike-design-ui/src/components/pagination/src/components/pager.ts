import { usePropsConfig } from '../utils';

const PagerProps = usePropsConfig(
  'current',
  'disabled',
  'fixWidth',
  'pagerCount',
  'total',
  'size',
);

type PagerEmits = {
  (e: 'update:current', current: number): void;
};

export type { PagerEmits };
export { PagerProps };
