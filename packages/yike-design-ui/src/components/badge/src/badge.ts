import { Status } from '../../../utils/constant';

export type BadgeProps = {
  color?: string;
  count?: number;
  isDot?: boolean;
  outDot?: boolean;
  offset?: 'left' | 'right';
  overflowCount?: number;
  showZero?: boolean;
  status?: Status;
  hidden?: boolean;
};
