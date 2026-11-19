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
import { computed, ref, toRefs, watch } from 'vue'
import { useFormItem } from '../../utils'

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

const { disabled, size } = toRefs(props)
const { mergedDisabled, mergedSize, validate } = useFormItem({
  disabled,
  size,
})

const switchSize = computed(() => (mergedSize.value === 's' ? 's' : 'm'))
const currentValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    currentValue.value = value
  },
)

const isChecked = computed(() => currentValue.value === props.checkedValue)

const isDisabled = computed(() => mergedDisabled.value || props.loading)

const classes = computed(() => {
  return [
    'yk-switch',
    `yk-switch--${switchSize.value}`,
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
  validate('change')
  emit('update:modelValue', currentValue.value)
  emit('change', currentValue.value, e)
}
</script>
