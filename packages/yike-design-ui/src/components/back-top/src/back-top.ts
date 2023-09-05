import { AnimationType } from '../../utils/constant';

export type BackTopProps = {
  animation?: AnimationType;
  theme?: 'primary' | 'secondary';
  right?: string | number;
  bottom?: string | number;
  visibleHeight?: string | number;
  target?: string | HTMLElement;
  icon?: string;
  behavior?: 'smooth' | 'instant' | 'auto';
};
