import { UPDATE_MODEL_EVENT, provideKey } from './constants';
import { SetupContext, computed, inject } from 'vue';
import { RadioProps } from './radio';
import type { RadioEmits } from './radio';
export const useRadio = (
  props: {
    label: RadioProps['label'];
    modelValue?: RadioProps['modelValue'];
    disabled: RadioProps['disabled'];
  },
  emits?: SetupContext<RadioEmits>['emit'],
) => {
  const radioProps = inject(provideKey, undefined);
  const isGroup = computed(() => !!radioProps);
  const modelValue = computed<RadioProps['modelValue']>({
    get() {
      return isGroup.value ? radioProps!.modelValue : props.modelValue!;
    },
    set(val) {
      if (isGroup.value) {
        // console.log('group');
        radioProps!.changeEvent(val);
      } else {
        // console.log('lonely');
        emits && emits(UPDATE_MODEL_EVENT, val);
      }
    },
  });
  const disabled = computed<RadioProps['disabled']>(() =>
    isGroup.value ? radioProps!.disabled : props.disabled!,
  );

  return {
    modelValue,
    disabled,
  };
};
