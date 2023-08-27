import { Ref, ref, getCurrentInstance, computed } from 'vue';

export type ChangeFn<T> = (val: T, ...args: any) => void;

export default function useVModel<T>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: Ref<T>,
  onChange?: ChangeFn<T>,
  customName = 'value',
): [Ref<T>, ChangeFn<T>] {
  const { vnode, emit } = getCurrentInstance() || {};
  let { props } = vnode || {};

  props = props || {};

  // 判断v-model、modelValue， model-value传参方式,
  if (
    Object.prototype.hasOwnProperty.call(props, 'modelValue') ||
    Object.prototype.hasOwnProperty.call(props, 'model-value')
  ) {
    const triggerEmit = (newVal: T, ...arg: any) => {
      emit && emit('update:modelValue', newVal);
      onChange && onChange(newVal, ...arg);
    };

    return [
      computed<T>({
        get() {
          return modelValue.value!;
        },
        set(val: T) {
          triggerEmit(val);
        },
      }),
      triggerEmit,
    ];
  }

  // 处理自定义名称的，比如v-model:value、v-model:xxx, update:value
  if (Object.prototype.hasOwnProperty.call(props, customName)) {
    const triggerEmit = (newVal: T, ...arg: any) => {
      emit && emit(`update:${customName}`, newVal);
      onChange && onChange(newVal, ...arg);
    };

    return [
      computed<T>({
        get() {
          return value.value;
        },
        set(val) {
          triggerEmit(val);
        },
      }),
      triggerEmit,
    ];
  }

  // 默认的非受控的
  const pValue = ref(defaultValue);
  const triggerEmit = (newVal: T, ...arg: any) => {
    pValue.value = newVal;
    onChange && onChange(newVal, ...arg);
  };

  return [
    computed<T>({
      get() {
        return pValue.value;
      },
      set(val: T) {
        triggerEmit(val);
      },
    }),
    triggerEmit,
  ];
}
