// 进度条状态
export type Status = 'success' | '' | 'error';

// 进度条组件传参类型
export type ProgressProps = {
  type?: 'line' | 'circle';
  percent?: 20;
  status?: Status;
  showInfo?: boolean;
};
