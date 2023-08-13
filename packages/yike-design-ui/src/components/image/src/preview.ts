import { FitType } from './image';

export interface ImagePreviewProps {
  /** 显示或隐藏 */
  visible?: boolean;
  /** 图像路径 */
  src?: string;
  /** 是否显示右上角关闭按钮 */
  closable?: boolean;
  /** 点击 mask 是否触发关闭 */
  maskClosable?: boolean;
  /** 是否在 priview-group 中，用于显示/隐藏上下一张图片按钮 */
  previewGroup?: boolean;
  /** 设置弹出框的挂载点，同 teleport 的 to，缺省值是 document.body */
  popupContainer?: string | HTMLElement;
  /** 关闭时是否卸载节点 */
  unmountOnClose?: boolean;
  /** 取消按钮点击事件 */
  onCancel?: () => void;
}

export interface ImagePreviewGroupProps {
  /** 显示或隐藏 */
  visible?: boolean;
  /** 当前展示图像的下标 */
  current?: number;
  /** 图像路径集 */
  srcList?: string[];
  /** 图像的统一宽度 */
  width?: number | string;
  /** 图像的统一高度 */
  height?: number | string;
  /** 默认显示图像的下标 */
  defaultCurrent?: number;
  /** 是否渲染图像 */
  isRender?: boolean;
  /** 是否显示右上角关闭按钮 */
  closable?: boolean;
  /** 点击 mask 是否触发关闭 */
  maskClosable?: boolean;
  /** 内容应该如何适应到其使用高度和宽度确定的框 */
  fit?: FitType;
  /** 取消按钮点击事件 */
  onCancel?: () => void;
}
