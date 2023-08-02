import { Status } from '../../utils/constant';

export type BadgeProps = {
  color?: string;
  count?: number;
  border?: number;
  isDot?: boolean;
  inDot?: boolean;
  offset?: 'left' | 'right' | [number, number];
  overflowCount?: number;
  showZero?: boolean;
  status?: Status;
  hidden?: boolean;
};
