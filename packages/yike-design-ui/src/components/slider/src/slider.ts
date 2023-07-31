import { StyleValue, VNode } from 'vue';

export enum DirectionType {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export interface SliderMark {
  percent: number;
  label: string;
  style?: StyleValue;
  titleNode?: VNode;
}

export interface SliderProps {
  modelValue: number | number[];
  disabled?: boolean;
  min?: number;
  max?: number;
  direction?: DirectionType;
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
  direction: DirectionType;
  step: number;
}

export type SliderEmitEvents = 'update:modelValue' | 'change';

export type SliderEmits = (event: SliderEmitEvents, ...arg: any[]) => void;
