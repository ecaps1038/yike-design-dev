<template>
  <yk-space
    v-if="type === 'radio'"
    :direction="direction"
    :size="mergedSize"
    :type="type"
    :class="bem([type, mergedSize, direction])"
  >
    <slot />
  </yk-space>
  <div v-else :class="bem([type, mergedSize], { solid })">
    <div :class="bem('container', [mergedSize])"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, provide, reactive, toRefs } from 'vue'
import { RadioGroupProps, radioGroupEmits } from './radio-group'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT, provideKey } from './constants'
import { YkSpace } from '../../space'
import { createCssScope, useFormItem } from '../../utils'

const emits = defineEmits(radioGroupEmits)

const bem = createCssScope('radio-group')
const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: 'horizontal',
  type: 'radio',
  size: 'l',
  solid: false,
})

const { size, disabled } = toRefs(props)

const { mergedSize, mergedDisabled } = useFormItem({
  size,
  disabled,
})

const changeEvent = (value: RadioGroupProps['modelValue']): void => {
  emits(UPDATE_MODEL_EVENT, value)
  nextTick(() => emits(CHANGE_EVENT, value))
}

provide(
  provideKey,
  reactive({
    ...toRefs(props),
    disabled: mergedDisabled,
    changeEvent,
  }),
)
</script>
