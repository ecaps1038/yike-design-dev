import { Size, Status } from '../../../utils/constant';

export type InputProps = {
  id?: string;
  name?: string;
  size?: Size;
  type?: 'text' | 'password';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  clearable?: boolean;
  visible?: boolean;
  status?: Status;
  loading?: boolean;
  showCounter?: boolean;
  limit?: number;
};