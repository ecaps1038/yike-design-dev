import { Size } from '../../../utils/constant';

export type AvatarProps = {
  shape?: 'circle' | 'square';
  size?: number | Size;
  icon?: string;
  imgUrl?: string;
};

export type AvatarGroupProps = {
  shape?: 'circle' | 'square';
  size?: number | Size;
  max?: number;
};
