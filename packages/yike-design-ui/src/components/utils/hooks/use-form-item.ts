import { computed, inject, Ref } from 'vue';
import { FormItemContext, formItemContextKey } from '../../form/index';
import { Size } from '../constant';
export const useFormItem = ({
  disabled,
  status,
  message,
  size,
}: {
  disabled?: Ref<boolean>;
  message?: Ref<string>;
  status?: Ref<string>;
  size?: Ref<Size>;
} = {}) => {
  const formItemCtx = inject(formItemContextKey, {} as FormItemContext);

  const validateInstance = computed(() => {
    return formItemCtx.validateInstance;
  });

  const mergedDisabled = computed(
    () => disabled?.value || formItemCtx.disabled,
  );
  const layout = computed(() => formItemCtx.layout);

  const mergedSize = computed(() => () => size?.value || formItemCtx.size);

  const isError = computed(() => validateInstance.value.isError);

  const mergedStatus = computed(
    () => validateInstance.value?.status ?? status?.value,
  );

  // ToDo
  // 添加radio、select、input等数据录入组件样式、尺寸的适配
  return {
    formItemCtx,
    mergedDisabled,
    isError,
    mergedStatus,
    mergedSize,
    layout,
  };
};
