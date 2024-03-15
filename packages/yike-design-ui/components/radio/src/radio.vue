<template>
  <label :class="bem([type], { disabled, solid })" role="radio">
    <input
      v-model="modelValue"
      type="radio"
      :value="value"
      :disabled="disabled"
      @change="handleChange"
    />
    <span
      v-if="type === 'radio'"
      :class="
        bem('box', {
          checked: isChecked,
          disabled,
          shadow: !isChecked && !disabled,
        })
      "
    >
      <span :class="bem('inner', { checked: isChecked, disabled })"></span>
    </span>
    <span :class="bem('label', { disabled, checked: isChecked }, [size])">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { RadioProps, radioEmits } from './radio'
import { computed, nextTick } from 'vue'
import { useRadio } from './useRadio'
import { createCssScope } from '../../utils'
import { CHANGE_EVENT } from './constants'

defineOptions({ name: 'YkRadio' })

const bem = createCssScope('radio')
const emits = defineEmits(radioEmits)
const props = withDefaults(defineProps<RadioProps>(), {
  solid: false,
  type: 'radio',
  size: 'l',
})

const { modelValue, disabled, type, size, solid } = useRadio(props, emits)

const isChecked = computed<boolean>(() => modelValue.value === props.value)

const handleChange = () => {
  nextTick(() => emits(CHANGE_EVENT, modelValue.value))
}
</script>
