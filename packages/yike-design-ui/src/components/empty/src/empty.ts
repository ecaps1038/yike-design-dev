import { CSSProperties } from 'vue';
import { Type } from '../../../utils/constant';
export interface EmptyProps {
  description?: string;
  image?: string;
  imageStyle?: CSSProperties;
  type?: Type;
}
