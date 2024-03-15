import { Size, Status } from '../../utils/constant';
import { InputProps } from '../../input';
import { TagProps } from '../../tag';

export type TagType = Array<string | number>;

export type InputTagProps = {
  modelValue?: TagType;
  value?: TagType;
  defaultValue?: TagType;
  status?: Status;
  size?: Size;
  clearable?: boolean;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  limit?: number;
  max?: number;
  mincollapsedNum?: number;
  inputProps?: InputProps;
  tagProps?: TagProps;
  onChange?: (val: TagType) => void;
};
