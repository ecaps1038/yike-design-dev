import { Shape, Size, Status, Type } from '../../utils';

export type ButtonProps = {
  type?: Type;
  status?: Status;
  size?: Size;
  shape?: Shape;
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
};
