<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { CheckboxGropProps } from './checkbox-group'
import { provide, ref, reactive, computed, toRaw } from 'vue'
import { checkboxGroupContextKey } from './constants'
import { isArray } from './checkbox'
defineOptions({
  name: 'YkCheckboxGroup',
})

const props = withDefaults(defineProps<CheckboxGropProps>(), {
  modelValue: undefined,
  defaultValue: () => [],
  disabled: false,
  max: undefined,
  tag: 'div',
})
const emits = defineEmits(['update:modelValue', 'change'])

const ns = 'yk-checkbox-group'

const curVal = ref(props.defaultValue)
const calcVal = computed(() =>
  isArray(props.modelValue) ? props.modelValue : curVal.value,
)
const handleChange = (val: Array<string | number>) => {
  curVal.value = val
  emits('update:modelValue', val)
  emits('change', val)
  // todo:form trigger
}
provide(
  checkboxGroupContextKey,
  reactive({
    name: 'YKCheckboxGroup',
    calcVal: calcVal,
    disabled: props.disabled,
    handleChange,
  }),
)
</script>

<style scoped></style>
