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
  defaultValue?: string;
  size?: string;
  disabled?: boolean;
  style?: Partial<CSSStyleDeclaration> | null;
  type?: string;
  disableConfirm?: boolean;
  step?: TimeStep | null;
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
}

export type TimeType = 'hour' | 'minute' | 'second';
export type ScrollBehavior = 'smooth' | 'instant';
