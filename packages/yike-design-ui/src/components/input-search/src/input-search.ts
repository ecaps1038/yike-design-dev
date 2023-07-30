import { Size, Status } from '../../utils/constant';

export type InputSearchProps = {
  name?: string;
  id?: string;
  size?: Size;
  placeholder?: string;
  clearable?: boolean;
  loading?: boolean;
};
