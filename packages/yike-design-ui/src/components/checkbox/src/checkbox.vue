<template>
  <label :class="[ns, disabled && `${ns}--disabled`]">
    <input
      ref="checkboxRef"
      type="checkbox"
      :class="[`${ns}-target`]"
      :disabled="disabled"
      :checked="calcChecked"
      @change="handleChange"
      @click="handleClick"
    />
    <div :class="calcCls">
      <yk-icon
        v-if="calcChecked"
        name="yk-gou2"
        :class="[disabled ? 'icon--disable' : 'icon--active']"
      ></yk-icon>
    </div>
    <slot>
      <span>{{ value }}</span>
    </slot>
  </label>
</template>
<script setup lang="ts">
import { CheckboxProps, isArray, isUndefined, toBoolean } from './checkbox'
import { YkIcon } from '../../../index'
import '../style'
import { computed, inject, ref, watch } from 'vue'
import { checkboxGroupContextKey } from './constants'
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
const isGroup = computed(() => checkboxGroupCtx)
const ischecked = ref(props.defaultChecked)

// 值计算
const calcVal = computed(() => {
  const curVal = props.modelValue ?? ischecked.value
  return isGroup.value ? checkboxGroupCtx.calcVal : curVal
})
//选中计算
const calcChecked = computed(() => {
  if (isGroup.value && isArray(calcVal.value)) {
    return calcVal.value.includes(props.value)
  }
  return toBoolean(calcVal.value)
})

const handleChange = (e: Event) => {
  const { checked } = e.target as HTMLInputElement
  ischecked.value = checked

  // if (isGroup) {

  // }
  emits('update:modelValue', checked)
  emits('change', checked)
}
watch(
  () => props.modelValue,
  (n) => {
    ischecked.value = isUndefined(n) ? false : toBoolean(n!)
    checkboxRef.value && (checkboxRef.value.checked = ischecked.value)
    console.log('n', n)
  },
)

const handleClick = (e: Event) => {
  e.stopPropagation()
}

const calcCls = computed(() => {
  return {
    [`${ns}-wrap`]: true,
    [`${ns}--active`]: calcChecked.value,
    [`${ns}--normal`]: !calcChecked.value && !props.disabled,
    [`disabled`]: props.disabled,
  }
})
</script>
