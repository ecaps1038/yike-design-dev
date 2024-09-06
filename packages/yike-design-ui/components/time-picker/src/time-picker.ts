import { CSSProperties } from 'vue';
import { Size } from '../../utils';

// 导出类型
export interface TimeValue {
  // 索引签名，以便ts知道如何处理未知属性
  [key: string]: string;
  hour: string;
  minute: string;
  second: string;
}

export interface TimeSelected {
  [key: string]: boolean[];
  hour: boolean[];
  minute: boolean[];
  second: boolean[];
}

export interface TimeStep {
  hour?: number;
  minute?: number;
  second?: number;
}

export interface TimePickerProps {
  modelValue?: string;
  defaultValue?: string | string[];
  size?: Size;
  disabled?: boolean;
  style?: Partial<CSSProperties> | null;
  type?: PickerType;
  disableConfirm?: boolean;
  step?: TimeStep | null;
  use12Hours?: boolean;
  format?: string;
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
}

export interface PickerValue {
  time: TimeValue;
  startTime: TimeValue;
  endTime: TimeValue;
}

export type HalfDay = 'pm' | 'am';
export type TimeType = 'hour' | 'minute' | 'second';
export type ScrollBehavior = 'smooth' | 'instant';
export type PickerType = 'time' | 'time-range';
export type RangeTime = 'time' | 'startTime' | 'endTime';
