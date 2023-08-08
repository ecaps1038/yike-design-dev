import { StyleValue, VNode } from 'vue';

export interface SliderMark {
  key: number;
  label?: string;
  style?: StyleValue;
  labelNode?: VNode;
}

export interface SliderMarksProps {
  modelValue: SliderMark[];
  percentStart: number;
  percentEnd: number;
  rangeMin: number;
  rangeMax: number;
}

export interface SliderMarkRenderItem extends SliderMark {
  percent: number;
  isOver: boolean;
  isOvered: boolean;
  markInfo: VNode;
}
