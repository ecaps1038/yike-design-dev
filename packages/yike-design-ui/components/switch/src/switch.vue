<template>
  <button
    type="button"
    role="switch"
    :class="classes"
    :style="styles"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span :class="`yk-switch-dot`">
      <svg v-if="loading" viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { SwitchProps, switchEmits } from './switch'
import { computed, ref, watch } from 'vue'

defineOptions({
  name: 'YkSwitch',
})

const emit = defineEmits(switchEmits)
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  size: 'm',
  loading: false,
  disabled: false,
  checkedValue: true,
  uncheckedValue: false,
})

const currentValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    currentValue.value = value
  },
)

const isChecked = computed(() => currentValue.value === props.checkedValue)

const isDisabled = computed(() => props.disabled || props.loading)

const classes = computed(() => {
  return [
    'yk-switch',
    `yk-switch--${props.size}`,
    {
      ['yk-switch--checked']: isChecked.value,
      ['yk-switch--loading']: props.loading,
    },
  ]
})

const styles = computed(() => ({
  backgroundColor: currentValue.value
    ? props.checkedColor
    : props.uncheckedColor,
}))

const handleClick = (e: Event) => {
  if (isDisabled.value) return
  currentValue.value = !isChecked.value
    ? props.checkedValue
    : props.uncheckedValue
  emit('update:modelValue', currentValue.value)
  emit('change', currentValue.value, e)
}
</script>
