<template>
  <label :class="bem({ checked: isChecked, disabled }, [type])" role="radio">
    <input
      v-model="modelValue"
      type="radio"
      :value="label"
      :disabled="disabled"
      @change="handleChange"
    />
    <span :class="bem('box', { checked: isChecked, disabled })">
      <span :class="bem('inner')"></span>
    </span>
    <span :class="bem('label')">
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
})

const { modelValue, disabled } = useRadio(props, emits)

const isChecked = computed<boolean>(() => modelValue.value === props.label)

const handleChange = () => {
  nextTick(() => emits(CHANGE_EVENT, modelValue.value))
}
</script>
