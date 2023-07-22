<template>
  <component :is="tag" :class="[ns, ...calcCls]">
    <template v-if="curOptions.length">
      <yk-checkbox
        v-for="c in curOptions"
        :key="c.value"
        :value="c.value"
        :disabled="c.disabled"
      >
        <slot v-if="slots.label" name="label" :data="c"></slot>
        <template v-else>
          {{ c.label ? c.label : c.value }}
        </template>
      </yk-checkbox>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts">
import { CheckboxGropProps, CheckboxOption } from './checkbox-group'
import { provide, ref, reactive, computed, toRaw, useSlots } from 'vue'
import { checkboxGroupContextKey } from './constants'
import { isArray } from './checkbox'
import { YkCheckbox } from '..'
defineOptions({
  name: 'YkCheckboxGroup',
})

const props = withDefaults(defineProps<CheckboxGropProps>(), {
  modelValue: undefined,
  defaultValue: () => [],
  disabled: undefined,
  max: undefined,
  tag: 'div',
  direction: 'horizontal',
  options: () => [],
})
const emits = defineEmits(['update:modelValue', 'change'])
const slots = useSlots()
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
const calcDisabled = computed(() => props.disabled)

const calcCls = computed(() => {
  return [`${ns}-direction-${props.direction}`]
})

const curOptions = computed<CheckboxOption[]>(() => {
  return (props.options || []).map((i) => {
    if (typeof i === 'number' || typeof i === 'string') {
      return {
        value: i,
        label: i,
        disabled: undefined,
        indeterminate: undefined,
      } as CheckboxOption
    }

    return i
  })
})

provide(
  checkboxGroupContextKey,
  reactive({
    name: 'YKCheckboxGroup',
    calcVal: calcVal,
    disabled: calcDisabled,
    handleChange,
  }),
)
</script>

<style scoped></style>
