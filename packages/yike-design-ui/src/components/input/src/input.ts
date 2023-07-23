import { Size, Status } from '../../../utils/constant';

export type InputProps = {
  id?: string;
  size?: Size;
  type?: 'text' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  clearable?: boolean;
  status?: Status;
  loading?: boolean;
};
