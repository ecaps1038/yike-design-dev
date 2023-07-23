import { PropType, VNode } from 'vue';

export const notificationTypes = [
  'success',
  'info',
  'warning',
  'error',
] as const;

export const NotificationIcon = {
  success: 'yike-gou',
  warning: 'yike-jinggao',
  error: 'yike-cha',
  info: 'yike-tixing',
};

export const NotificationProps = {
  id: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
    required: true,
  },
  type: {
    type: String,
    values: [...notificationTypes, ''],
    default: '',
  },
  message: {
    type: [String, Object] as PropType<string | VNode>,
    default: '',
  },
  duration: {
    type: Number,
    default: 3500,
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Number,
    default: 0,
  },
  zIndex: {
    type: Number,
    default: 3000,
  },
} as const;
