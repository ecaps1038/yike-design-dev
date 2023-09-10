import { Size } from '../../utils';

export type AvatarProps = {
  shape?: 'circle' | 'square' | number;
  size?: number | Size;
  imgUrl?: string;
};

export type AvatarGroupProps = {
  shape?: 'circle' | 'square' | number;
  size?: number | Size;
  max?: number;
};
