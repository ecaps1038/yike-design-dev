import { Size } from '../../utils/constant';

export type Status = 'normal' | 'success' | 'error';

// 进度条组件传参类型
export type ProgressProps = {
  type?: 'line' | 'circle';
  percent?: number;
  strokeColor?: string;
  size?: Size;
  status?: Status;
  showText?: boolean;
};
