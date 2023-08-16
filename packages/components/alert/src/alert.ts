/**
 * 警告提示的样式
 */
export type Type = 'success' | 'info' | 'warning' | 'error';

/**
 * 警告提示组件传参类型
 */
export interface AlertProps {
  /** 警告提示内容 */
  message?: string;
  /** 警告提示的样式 */
  type?: Type;
  /** 警告提示的标题 */
  title?: string;
  /** 是否展示关闭按钮 */
  closable?: boolean;
  /** 是否展示 Icon 图标 */
  showIcon?: boolean;
  /** 内容是否居中显示 */
  center?: boolean;
  /** 是否为顶部公告 */
  banner?: boolean;
}

/**
 * 警告提示组件事件类型
 */
export interface AlertEmits {
  /** 点击关闭按钮时触发 */
  (e: 'close', ev: MouseEvent): void;
}
