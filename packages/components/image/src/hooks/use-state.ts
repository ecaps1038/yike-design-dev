import { Ref, ref } from 'vue';

/**
 * 子组件内部独立管理一个 model 变量
 * @param defaultValue 默认值
 * @param value 默认值为 undefined | null 时，赋值 value
 * @param emitFn model 的 updateValue 函数，例：(v: boolean) => emit('update:visible', v)
 * @returns [Ref 类型的变量，赋值函数]
 */
export const useState = <T = any>(
  defaultValue: T,
  value: T,
  emitFn?: (v: T) => void,
): [Ref<T>, (v: T) => void] => {
  const internalValue = ref<any>(defaultValue);

  if (defaultValue !== undefined) internalValue.value = defaultValue;
  else internalValue.value = value;

  const setState = (v: T) => {
    internalValue.value = v;
    emitFn?.(v);
  };

  return [internalValue as Ref<T>, setState];
};
