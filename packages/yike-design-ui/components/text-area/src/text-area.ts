export type TextAreaProps = {
  disabled?: boolean;
  modelValue?: string;
  clearable?: boolean;
  placeholder?: string;
  maxLength?: number;
  showWordLimit?: boolean;
  autoSize?: {
    minRows?: number;
    maxRows?: number;
  };
};
