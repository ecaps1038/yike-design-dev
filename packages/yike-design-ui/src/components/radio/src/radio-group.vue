<template>
  <div class="yk-radio-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { nextTick, provide, reactive, toRefs } from 'vue'
import { RadioGroupProps, radioGroupEmits } from './radio-group'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT, provideKey } from './constants'

const emits = defineEmits(radioGroupEmits)

const props = withDefaults(defineProps<RadioGroupProps>(), {})
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

<style scoped></style>
