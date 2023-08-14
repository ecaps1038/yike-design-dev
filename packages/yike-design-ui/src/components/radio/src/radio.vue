<template>
  <label :class="ykRadioCls" role="radio">
    <span :class="ykRadioInputCls">
      <span class="yk-radio--inner"></span>
      <input
        v-model="modelValue"
        type="radio"
        :value="label"
        :disabled="disabled"
        @change="handleChange"
      />
    </span>
    <span class="yk-radio--label">
      <slot />
    </span>
  </label>
</template>
<script setup lang="ts">
import { RadioProps } from './radio'
import { computed, nextTick } from 'vue'
import { radioEmits } from './radio'
import { useRadio } from './useRadio'
import { CHANGE_EVENT } from './constants'

defineOptions({ name: 'YkRadio' })
const emits = defineEmits(radioEmits)
const props = withDefaults(defineProps<RadioProps>(), {})

const { modelValue, disabled } = useRadio(props, emits)

const isChecked = computed<boolean>(() => modelValue.value === props.label)
const ykRadioCls = computed(() => {
  return {
    'yk-radio': true,
    'is-checked': isChecked.value,
    'is-disabled': disabled.value,
  }
})

const ykRadioInputCls = computed(() => {
  return {
    'yk-radio--input': true,
    'is-checked': isChecked.value,
    'is-disabled': disabled.value,
  }
})

const handleChange = () => {
  nextTick(() => emits(CHANGE_EVENT, modelValue.value))
}
</script>
