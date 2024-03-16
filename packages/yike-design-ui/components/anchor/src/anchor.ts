import { InjectionKey, Ref } from 'vue';
import { ScrollbarProps } from '../../scrollbar';

export type AnchorOption = {
  title: string;
  href: string;
  children?: AnchorOption[];
};

export type AnchorProps = {
  options: AnchorOption[];
  /** 是否展示轴线 */
  showMarker?: boolean;
  /** 默认监听的滚动容器 */
  scrollEl?: () => HTMLElement | Window;
  /** 表示被锚定元素的出现的偏移量 */
  offset?: number;
  /** 滚动防抖延时 */
  ms?: number;
  scrollbar?: ScrollbarProps | boolean;
};

export type AnchorListProps = {
  options: AnchorOption[];
  active: string;
  root?: boolean;
};

export const anchorData: InjectionKey<{
  active: Ref<string>;
}> = Symbol('anchorData');
