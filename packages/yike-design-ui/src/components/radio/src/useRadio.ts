import { UPDATE_MODEL_EVENT, provideKey } from './constants';
import { SetupContext, computed, inject } from 'vue';
import { RadioProps } from './radio';
import type { RadioEmits } from './radio';

export const useRadio = (
  props: RadioProps,
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
        radioProps!.changeEvent(val);
      } else {
        emits && emits(UPDATE_MODEL_EVENT, val);
      }
    },
  });

  const disabled = computed<RadioProps['disabled']>(
    () => radioProps?.disabled || props.disabled!,
  );
  return {
    modelValue,
    disabled: disabled.value,
    type: radioProps?.type ?? props.type,
    size: radioProps?.size ?? props.size,
    solid: radioProps?.solid ?? props.solid,
  };
};
