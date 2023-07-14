import { TitleType, TextType } from '../../../utils/constant'
import { ExtractPropTypes } from 'vue'
export type textProps = {
  b?: boolean
  type?: TextType
  mark?: boolean
  underline?: boolean
  del?: boolean
}

export type titleProps = {
  level?: number
  type?: TitleType
}

export type ellipsisType = {
  rows?: number
  showMore?: boolean
}

export type EllipsisType = ExtractPropTypes<ellipsisType>

export interface paragraphProps {
  b?: boolean
  type?: TextType
  ellipsis?: ellipsisType
  copyable?: boolean
}
