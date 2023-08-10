import { computed, inject, Ref } from 'vue';
import { FormItemContext, formItemContextKey } from '../../form/index';

export const useFormItem = ({
  disabled,
  status,
  message,
}: {
  disabled?: Ref<boolean>;
  message?: Ref<string>;
  status?: Ref<string>;
} = {}) => {
  const formItemCtx = inject(formItemContextKey, {} as FormItemContext);

  const validateInstance = computed(() => {
    return formItemCtx.validateInstance;
  });

  const mergedDisabled = computed(
    () => disabled?.value || formItemCtx.disabled,
  );

  const isError = computed(() => validateInstance.value.isError);
  const mergedMessage = computed(
    () => validateInstance.value?.message ?? message,
  );
  const mergedStatus = computed(() => validateInstance.value?.status ?? status);

  return {
    formItemCtx,
    mergedDisabled,
    isError,
    mergedStatus,
    mergedMessage,
  };
};
