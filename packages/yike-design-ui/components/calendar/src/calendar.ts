import { ExtractPropTypes, PropType } from 'vue';

export const calendarProps = {
  modelValue: {
    type: Date as PropType<Date>,
  },
} as const;

export const calendarEmits = {
  'update:modelValue': (val: Date) => val instanceof Date,
  change: (val: Date) => val instanceof Date,
  'panel-change': (val: Date) => val instanceof Date,
};
export type CalendarProps = Partial<ExtractPropTypes<typeof calendarProps>>;
export type CalendarEmits = ExtractPropTypes<typeof calendarEmits>;

export type CellType = 'prev' | 'current' | 'next';
export interface CalendarCell {
  text: number;
  type: CellType;
}

export type CalendarDateType =
  | 'prev-year'
  | 'prev-month'
  | 'tody'
  | 'next-month'
  | 'next-year';
