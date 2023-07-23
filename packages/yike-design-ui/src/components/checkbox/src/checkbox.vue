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
    <div :class="calcCls">
      <yk-icon
        v-if="calcChecked"
        name="yk-gou2"
        :class="[calcDisabled ? 'icon--disable' : 'icon--active']"
      ></yk-icon>
    </div>
    <div>
      <slot>
        <span>{{ value }}</span>
      </slot>
    </div>
  </label>
</template>
<script setup lang="ts">
import { CheckboxProps } from './checkbox'
import { YkIcon } from '../../../index'
import '../style'
import { computed, inject, ref, watch } from 'vue'
import { checkboxGroupContextKey } from './constants'
import { isArray, isUndefined, toBoolean } from './utils'
defineOptions({
  name: 'YkCheckbox',
})
const ns = 'yk-checkbox'
const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: undefined,
})
const emits = defineEmits(['change', 'update:modelValue'])

const checkboxRef = ref<HTMLInputElement>()

const checkboxGroupCtx = inject(checkboxGroupContextKey, undefined)
const isGroup = computed(() => !!checkboxGroupCtx)
const ischecked = ref(props.defaultChecked)

// 值计算
const calcVal = computed(() => {
  const curVal = props.modelValue ?? ischecked.value
  return isGroup.value ? checkboxGroupCtx?.calcVal : curVal
})
//选中计算
const calcChecked = computed(() => {
  if (isGroup.value && isArray(calcVal.value)) {
    return calcVal.value!.includes(props.value as any)
  }
  return toBoolean(calcVal.value as string | number | boolean)
})

const calcDisabled = computed(() => {
  return checkboxGroupCtx?.disabled ?? props.disabled
})
const handleChange = (e: Event) => {
  const { checked } = e.target as HTMLInputElement
  ischecked.value = checked

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
    emits('update:modelValue', checked)
    emits('change', checked)
  }
  // todo:form trigger
}
watch(
  () => props.modelValue,
  (n) => {
    ischecked.value = isUndefined(n) ? false : toBoolean(n!)
    checkboxRef.value && (checkboxRef.value.checked = ischecked.value)
  },
)

const handleClick = (e: Event) => {
  e.stopPropagation()
}

const calcCls = computed(() => {
  return {
    [`${ns}-wrap`]: true,
    [`${ns}--active`]: calcChecked.value,
    [`${ns}--normal`]: !calcChecked.value && !calcDisabled.value,
    [`disabled`]: calcDisabled.value,
  }
})
</script>
