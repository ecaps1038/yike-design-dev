import { TitleType, TextType } from '../../utils';

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
  openText?: string;
  closeText?: string;
}

export type paragraphEmits = {
  changeOpen: [open: boolean];
};
