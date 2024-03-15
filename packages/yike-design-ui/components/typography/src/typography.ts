import { TitleType, TextType } from '../../utils';
import type { Ref } from 'vue';

export type titleProps = {
  type?: TitleType;
  level?: number;
};

export type textProps = {
  type?: TextType;
  del?: boolean;
  mark?: boolean;
  strong?: boolean;
  underline?: boolean;
};

export interface paragraphProps {
  rows?: number;
  copyable?: boolean;
  moreable?: boolean;
  open?: boolean;
  openText?: string;
  closeText?: string;
}

export type paragraphEmits = {
  copyBefore: [value: Ref<string>];
  changeOpen: [open: boolean];
  'update:open': [open: boolean];
};
