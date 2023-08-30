import { AvatarProps } from '../../avatar/src/avatar';

export interface SkeletonProps {
  loading?: boolean;
  width?: string;
  height?: string;
  animated?: boolean;
  avatar?: boolean;
  avatarStyle?: AvatarProps;
  round?: boolean;
  row?: string | number;
  title?: boolean;
}
