import { Ref, ref, getCurrentInstance, computed } from 'vue';

export type ChangeFn<T> = (val: T, ...args: any) => void;

export const useVModel = <T>(
  value: Ref<T>,
  modelValue: Ref<T>,
  defaultValue: Ref<T>,
  onChange?: ChangeFn<T>,
  customName = 'value',
): [Ref<T>, ChangeFn<T>] => {
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

  // 返回值兼容两种场景，一种是返回一个方法，通过方法设置，另一种场景是不使用方法，而是直接赋值去更新，比如splice一个数组，会直接更新。
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
};
