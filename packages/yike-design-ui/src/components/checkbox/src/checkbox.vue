<template>
  <label :class="[ns, calcDisabled && `${ns}--disabled`]">
    <input
      ref="checkboxRef"
      type="checkbox"
      :class="[`${ns}-target`]"
      :disabled="calcDisabled"
      :checked="calcChecked"
      @change="handleChange"
      @click="handleClick"
    />
    <div :class="calcCls"></div>
    <div>
      <slot>
        <span>{{ value }}</span>
      </slot>
    </div>
  </label>
</template>

<script setup lang="ts">
import { CheckboxProps } from './checkbox'
import { computed, inject, ref, watch } from 'vue'
import { checkboxGroupContextKey } from './constants'
import { isArray, isUndefined, toBoolean } from './utils'
import '../style'

defineOptions({
  name: 'YkCheckbox',
})

const ns = 'yk-checkbox'
const props = withDefaults(defineProps<CheckboxProps>(), {
  defaultChecked: false,
  disabled: false,
  checked: undefined,
})
const emits = defineEmits<{
  change: [boolean]
  'update:checked': [boolean]
}>()

const checkboxRef = ref<HTMLInputElement>()

const checkboxGroupCtx = inject(checkboxGroupContextKey, undefined)
const isGroup = computed(() => !!checkboxGroupCtx)
const isChecked = ref(props.defaultChecked)

// 值计算
const calcVal = computed(() => {
  const curVal = props.checked ?? isChecked.value
  return isGroup.value ? checkboxGroupCtx?.calcVal : curVal
})
//选中计算
const calcChecked = computed(() => {
  if (isGroup.value && isArray(calcVal.value)) {
    return calcVal.value!.includes(props.value as any)
  }
  return toBoolean(calcVal.value as string | number | boolean)
})

// 组禁用>项禁用>max(禁用未勾选)
const calcDisabled = computed(() => {
  return (
    checkboxGroupCtx?.disabled ||
    props.disabled ||
    (!isChecked.value && checkboxGroupCtx?.isMax)
  )
})
const handleChange = (e: Event) => {
  const { checked } = e.target as HTMLInputElement
  isChecked.value = checked

  let newVal
  if (isGroup.value && isArray(calcVal.value)) {
    const set = new Set(calcVal.value)
    if (checked) {
      set.add(props.value ?? true)
    } else {
      set.delete(props.value ?? true)
    }
    newVal = Array.from(set)

    checkboxGroupCtx?.handleChange(newVal)
  } else {
    emits('update:checked', checked)
    emits('change', checked)
  }
  // todo:form trigger
}
watch(
  () => props.checked,
  (n) => {
    isChecked.value = isUndefined(n) ? false : toBoolean(n!)
    checkboxRef.value && (checkboxRef.value.checked = isChecked.value)
  },
)

const handleClick = (e: Event) => {
  e.stopPropagation()
}

const calcCls = computed(() => {
  return {
    [`${ns}-wrap`]: true,
    [`${ns}--active`]: calcChecked.value && !props.indeterminate,
    [`${ns}--normal`]:
      !calcChecked.value && !calcDisabled.value && !props.indeterminate,
    // 半选效果
    [`${ns}--indeterminate`]: props.indeterminate,
    [`indeterminate--checked`]: props.indeterminate,
    [`yk-disabled`]: calcDisabled.value,
    [`${ns}--common`]: !props.indeterminate,
    // shadow
    [`yk-show-shadow`]: calcChecked.value || props.indeterminate,
  }
})
</script>
