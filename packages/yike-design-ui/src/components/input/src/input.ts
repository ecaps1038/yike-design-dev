import { CSSProperties } from 'vue';
import { Size, Status } from '../../utils/constant';

export type InputProps = {
  id?: string;
  name?: string;
  size?: Size;
  type?: 'text' | 'password';
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  clearable?: boolean;
  visible?: boolean;
  status?: Status;
  loading?: boolean;
  showCounter?: boolean;
  limit?: number;
  tooltip?: string;
  style?: CSSProperties;
};
