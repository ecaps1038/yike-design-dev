import { Direction } from '../../utils';
import { SliderMark } from './slider-marks';

export interface SliderProps {
  modelValue: number | number[];
  disabled?: boolean;
  min?: number;
  max?: number;
  direction?: Direction;
  step?: number;
  marks?: SliderMark[];
  height?: number;
  showInput?: boolean;
}

export interface UseSliderProps {
  modelValue: number | number[];
  disabled: boolean;
  min: number;
  max: number;
  direction: Direction;
  step: number;
}

export type SliderEmitEvents = 'update:modelValue' | 'change';

export type SliderEmits = (event: SliderEmitEvents, ...arg: any[]) => void;
