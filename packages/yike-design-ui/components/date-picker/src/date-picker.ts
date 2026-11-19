import type { Size, Status } from '../../utils';

/** 日期值：Date / 时间戳 / 字符串 / 空 */
export type DatePickerValue = Date | number | string | null | undefined;

export type DatePickerProps = {
  modelValue?: DatePickerValue;
  /** 展示格式（dayjs format），默认 YYYY-MM-DD */
  format?: string;
  /** 绑定值格式：不传时 v-model 为 Date；传入时 v-model 为按该格式序列化的字符串 */
  valueFormat?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: Size;
  status?: Status;
  /** 不可选择的日期 */
  disabledDate?: (date: Date) => boolean;
};

export type DatePickerEmits = {
  'update:modelValue': [value: DatePickerValue];
  change: [value: DatePickerValue];
  'visible-change': [visible: boolean];
  clear: [];
  focus: [];
  blur: [];
};
