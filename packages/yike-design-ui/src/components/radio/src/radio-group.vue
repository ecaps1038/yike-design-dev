<template>
  <div :class="ykRadioGroupCls" :type="type">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, provide, reactive, toRefs } from 'vue'
import { RadioGroupProps, radioGroupEmits } from './radio-group'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT, provideKey } from './constants'
import '../style'

const emits = defineEmits(radioGroupEmits)
const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: 'horizontal',
  type: 'radio',
})

const ykRadioGroupCls = computed(() => {
  return {
    'yk-radio-group': true,
    'yk-radio-vertical': props.direction === 'vertical',
    [`yk-radio--${props.size}`]: props.size,
    [`yk-radio--${props.theme}`]: props.theme,
  }
})
const changeEvent = (value: RadioGroupProps['modelValue']): void => {
  emits(UPDATE_MODEL_EVENT, value)
  nextTick(() => emits(CHANGE_EVENT, value))
}

provide(
  provideKey,
  reactive({
    ...toRefs(props),
    changeEvent,
  }),
)
</script>
