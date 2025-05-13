export type SelectProps = {
  modelValue?: string | number | boolean | Array<string | number | boolean>;
  options?: Array<{
    value: string | number | boolean;
    label: string;
    disabled?: boolean;
  }>;
  multiple?: boolean;
  disabled?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  emptyText?: string;
  size?: 's' | 'm' | 'l';
};
