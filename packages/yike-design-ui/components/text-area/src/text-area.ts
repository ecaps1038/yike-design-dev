import type { Status } from '../../utils';

export type TextAreaProps = {
  disabled?: boolean;
  status?: Status;
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
