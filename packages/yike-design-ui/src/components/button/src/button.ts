import { Shape, Size, Status, Type } from '../../../utils/constant';

export type ButtonProps = {
  type?: Type;
  status?: Status;
  size?: Size;
  shape?: Shape;
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
};
