import { Status, Size } from '../../utils';

export enum TagShape {
  square = 'square',
  round = 'round',
  mark = 'mark',
}

export type TagSizes = Exclude<Size, 'xl'>;

export type TagProps = {
  type?: Status | 'defualt';
  closeable?: boolean;
  bgColor?: string;
  color?: string;
  size?: TagSizes;
  checked?: boolean;
  disabled?: boolean;
  shape?: `${TagShape}`;
};

export interface TagEmits {
  (e: 'close', ev: MouseEvent): void;
  (e: 'change', v: boolean, ev: MouseEvent): void;
}
