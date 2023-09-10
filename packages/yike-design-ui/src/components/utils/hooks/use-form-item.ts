import { computed, inject, Ref } from 'vue';
import { FormItemContext, formItemContextKey } from '../../form/index';
export const useFormItem = ({
  disabled,
  status,
  message,
  size,
}: {
  disabled?: Ref<boolean>;
  message?: Ref<string>;
  status?: Ref<string>;
  size?: Ref<any>;
} = {}) => {
  const formItemCtx = inject(formItemContextKey, {} as FormItemContext);

  const validateInstance = computed(() => {
    return formItemCtx.validateInstance;
  });

  const mergedDisabled = computed(
    () => disabled?.value || formItemCtx.disabled,
  );
  const layout = computed(() => formItemCtx.layout);

  const mergedSize = computed(() => formItemCtx?.size || size?.value);

  const isError = computed(() => validateInstance.value?.isError ?? false);
  const mergedMessage = computed(
    () => validateInstance.value?.message ?? message?.value,
  );
  const mergedStatus = computed(
    () => validateInstance.value?.status ?? status?.value,
  );
  const validate = (event: string) => {
    if (formItemCtx?.validate) {
      formItemCtx.validate(event);
    }
  };
  // ToDo
  // 添加radio、select、input等数据录入组件样式、尺寸的适配
  return {
    formItemCtx,
    mergedDisabled,
    mergedMessage,
    isError,
    mergedStatus,
    mergedSize,
    layout,
    validate,
  };
};
