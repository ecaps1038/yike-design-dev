export type FitType = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export type ImageProps = {
  /** 图片获取地址 */
  src?: string;
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 标题 */
  title?: string;
  /** 图像的文本描述 */
  alt?: string;
  /** 描述，将显示在底部，如果 alt 没有值，则会将其设置给 alt */
  description?: string;
  /** 标题和介绍的位置 */
  footerPosition?: 'inner' | 'outer';
  /** 是否启用懒加载，当元素出现在可视窗口后加载资源 */
  isLazy?: boolean;
  /** 内容应该如何适应到其使用高度和宽度确定的框 */
  fit?: FitType;
  /** 是否开启预览 */
  preview?: boolean;
  /** 设置弹出框的挂载点，同 teleport 的 to，缺省值是 document.body */
  popupContainer?: string | HTMLElement;
  /** 取消按钮点击事件 */
  onCancel?: () => void;
};

export type DirectiveHTMLDivElement = HTMLDivElement & {
  _observer?: IntersectionObserver;
};
