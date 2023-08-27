import { Size, Status } from '../../utils/constant';
import { InputProps } from '../../input';

export type TagType = Array<string | number>;
export type DisplayModeType = 'scroll' | 'break-line';

export type InputTagProps = {
  modelValue: TagType;
  value: TagType;
  defaultValue: TagType;
  onChange: (val: TagType) => void;
  status: Status;
  tips: string;
  size: Size;
  allowClear: boolean;
  placeholder: string;
  readonly: boolean;
  disabled: boolean;
  max: number;
  displayMode: DisplayModeType;
  message: string;
  inputProps: InputProps;
};
