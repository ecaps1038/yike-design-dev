import { usePropsConfig } from '../utils';

const JumperProps = usePropsConfig(
  'current',
  'jumperLabel',
  'total',
  'simple',
  'size',
  'disabled',
);

type JumperEmits = {
  (e: 'jump', value: number): void;
};

export type { JumperEmits };
export { JumperProps };
