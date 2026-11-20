import type { Size } from '../../utils';

export type DescriptionItem = {
  key?: string | number;
  label: string;
  value?: string | number;
  /** 占用的列数，默认 1 */
  span?: number;
};

export type DescriptionsProps = {
  items?: DescriptionItem[];
  /** 每行列数 */
  column?: number;
  border?: boolean;
  /** label 与 value 的排列方向 */
  direction?: 'horizontal' | 'vertical';
  size?: Size;
  title?: string;
};
