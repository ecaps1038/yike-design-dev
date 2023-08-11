<template>
  <component
    :is="tag"
    :class="bem([direction, mergedSize])"
    :style="calcGapStyle"
  >
    <template v-if="curOptions.length">
      <yk-checkbox
        v-for="c in curOptions"
        :key="c.value"
        :checked="curVal.includes(c.value)"
        :value="c.value"
        :disabled="c.disabled"
        :indeterminate="c.indeterminate"
      >
        <slot v-if="slots.label" name="label" :data="c"></slot>
        <template v-else>
          {{ c?.label ?? c.value }}
        </template>
      </yk-checkbox>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts">
import type {
  CheckboxGroupProps,
  CheckboxOption,
  CheckboxGroupValue,
} from './checkbox-group'
import {
  provide,
  ref,
  reactive,
  computed,
  useSlots,
  CSSProperties,
  toRefs,
} from 'vue'
import { checkboxGroupContextKey } from './constants'
import { flexDirection, getMargin, isArray } from './utils'
import { useFormItem, createCssScope } from '../../utils'
import { YkCheckbox } from '..'

defineOptions({
  name: 'YkCheckboxGroup',
})
const bem = createCssScope('checkbox-group')

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  defaultValue: () => [],
  disabled: undefined,
  tag: 'div',
  direction: 'horizontal',
  options: () => [],
  size: 'l',
  gap: 'l',
})
const { size, disabled } = toRefs(props)

const { mergedSize, mergedDisabled } = useFormItem({
  size,
  disabled,
})

const emits = defineEmits<{
  change: [CheckboxGroupValue[]]
  'update:modelValue': [CheckboxGroupValue[]]
}>()

const slots = useSlots()

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

const curOptions = computed<CheckboxOption[]>(() => {
  return props.options.map((i) => {
    if (typeof i === 'number' || typeof i === 'string') {
      return {
        value: i,
        label: i,
      } as CheckboxOption
    }

    return i
  })
})

// 计算限制可勾选
const isMax = computed(() => {
  return props.max === undefined ? false : calcVal.value.length > props.max
})

const resolveGap = computed((): CSSProperties => {
  if (Array.isArray(props.gap)) {
    return {
      rowGap: `${props.gap[1]}px`,
      columnGap: `${props.gap[0]}px`,
    }
  } else {
    return {
      gap: `${getMargin(props.gap)}px`,
    }
  }
})
const calcGapStyle = computed<CSSProperties>(() => {
  return {
    flexDirection: flexDirection(props.direction),
    ...resolveGap.value,
  }
})
provide(
  checkboxGroupContextKey,
  reactive({
    name: 'YKCheckboxGroup',
    calcVal: calcVal,
    disabled: calcDisabled,
    handleChange,
    isMax,
  }),
)
</script>

<style scoped></style>
