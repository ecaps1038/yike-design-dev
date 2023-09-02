import { TitleType, TextType } from '../../utils';
import { ExtractPropTypes } from 'vue';

export type textProps = {
  strong?: boolean;
  type?: TextType;
  mark?: boolean;
  underline?: boolean;
  del?: boolean;
};

export type titleProps = {
  level?: number;
  type?: TitleType;
};

export type ellipsisType = {
  rows?: number;
  showMore?: boolean;
};

export type EllipsisType = ExtractPropTypes<ellipsisType>;

export interface paragraphProps {
  strong?: boolean;
  type?: TextType;
  ellipsis?: ellipsisType;
  copyable?: boolean;
}

export type BlockProps = {
  mark?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
};
