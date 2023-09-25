<template>
  <YkInput
    ref="inputRef"
    :model-value="displayValue"
    :disabled="mergedDisabled"
    :size="mergedSize"
    :class="bem()"
    v-bind="$attrs"
    @focus="focus"
    @change="change"
    @blur="blur"
    @hoverin="isHovering = true"
    @hoverout="isHovering = false"
    @keydown="keydown"
  >
    <template #suffix>
      <div
        v-show="controls && !mergedDisabled && isHovering"
        :class="[bem('buttons'), bem([mergedSize])]"
      >
        <YkButton
          :disabled="isMax"
          :size="mergedSize"
          type="secondary"
          @click="increase"
          @mousedown="startCombo(1)"
        >
          <IconUpOutline />
        </YkButton>
        <YkButton
          :disabled="isMin"
          :size="mergedSize"
          type="secondary"
          @click="decrease"
          @mousedown="startCombo(0)"
        >
          <IconDownOutline />
        </YkButton>
      </div>
    </template>
  </YkInput>
</template>
<script setup lang="ts">
import { calculate, numberMatchReg, normalizeNumber } from './utils'
import { createCssScope, useFormItem } from '../../utils'
import { InputNumberProps } from './input-number'
import { toRefs, ref, onMounted, computed, watch } from 'vue'
import { IconUpOutline, IconDownOutline } from '../../svg-icon'
import { YkInput, YkButton } from '../../../index'

defineOptions({
  name: 'YkInputNumber',
})

const props = withDefaults(defineProps<InputNumberProps>(), {
  step: 1,
  max: Infinity,
  min: -Infinity,
  precision: 0,
  size: 'l',
  disabled: false,
  controls: true,
  formatter: (value: string) => {
    return value
  },
})

const bem = createCssScope('input-number')

const emits = defineEmits(['update:modelValue', 'increase', 'decrease'])
const isHovering = ref<boolean>(false)
const isFocus = ref<boolean>(false)
// 触发“连击”的所需时间
const TimeBeforeCombo = 250
// “连击”的速度
const ComboSpeed = 60
const valueRefs = toRefs(props)
const lastValue = ref<number>(0)
const inputRef = ref<InstanceType<typeof YkInput>>()

const { disabled, size } = valueRefs

const { mergedSize, mergedDisabled } = useFormItem({
  disabled,
  size,
})
let nextValue

// 计算精度
const precision = computed(() => {
  let pre = valueRefs.precision.value
  if (!Number.isInteger(pre) || pre > 20) {
    pre = 0
  }
  return pre
})

// 根据 max 和 min 获得合适的初始值
const getInitialValue = () => {
  if (props.max === Infinity && props.min === -Infinity) {
    return 0
  }
  return props.min
}

// mode: 0 = 减模式, 1 = 加模式
let timeoutID: number | undefined
let intervalID: number | undefined
const startCombo = (mode: 0 | 1) => {
  if (props.disabled) return
  const action = mode === 1 ? increase : decrease
  // 考虑到鼠标左键会在按钮外弹起
  window.addEventListener('mouseup', stopCombo)

  timeoutID = window.setTimeout(() => {
    intervalID = window.setInterval(() => {
      action()
    }, ComboSpeed)
  }, TimeBeforeCombo)
}

const stopCombo = () => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  if (intervalID) {
    clearInterval(intervalID)
  }
  window.removeEventListener('mouseup', stopCombo)
}

// 极值约束
const isMin = computed(() => {
  return lastValue.value <= valueRefs.min.value
})

const isMax = computed(() => {
  return lastValue.value >= valueRefs.max.value
})

onMounted(() => {
  lastValue.value = valueRefs.modelValue?.value ?? getInitialValue()
})

const increase = () => {
  if (isMax.value) {
    stopCombo()
    return
  }
  nextValue = calculate(lastValue.value, valueRefs.step.value, precision.value)
  lastValue.value =
    nextValue >= valueRefs.max.value ? valueRefs.max.value : nextValue
  update()
  emits('increase')
}

const decrease = () => {
  if (isMin.value) {
    stopCombo()
    return
  }
  nextValue = calculate(lastValue.value, -valueRefs.step.value, precision.value)
  lastValue.value =
    nextValue <= valueRefs.min.value ? valueRefs.min.value : nextValue
  update()
  emits('decrease')
}

const keydown = (ev: KeyboardEvent) => {
  if (ev.key === 'ArrowUp') {
    increase()
  }
  if (ev.key === 'ArrowDown') {
    decrease()
  }
}

const change = () => {
  update()
}

const focus = () => {
  isFocus.value = true
  return
}

const blur = (value: string) => {
  // 使用正则匹配数字 不合法视为 ‘0’
  lastValue.value = value
    ? Number((value.match(numberMatchReg) ?? ['0'])[0])
    : 0
  if (precision.value === 0) {
    lastValue.value = Math.trunc(lastValue.value)
  } else {
    lastValue.value = normalizeNumber(lastValue.value, precision.value)
  }
  if (isMax.value) {
    lastValue.value = valueRefs.max.value
  }
  if (isMin.value) {
    lastValue.value = valueRefs.min.value
  }
  update()
  isFocus.value = false
  inputRef.value?.setValue(displayValue.value)
}

const update = () => {
  emits('update:modelValue', lastValue.value)
}

const displayValue = computed(() => {
  const lastDisplayValue = lastValue.value.toFixed(precision.value)

  if (!isFocus.value) {
    return valueRefs.formatter.value(lastDisplayValue) ?? lastDisplayValue
  }
  return lastDisplayValue
})

// 模型同步
watch(
  () => props.modelValue,
  (newValue) => {
    lastValue.value = newValue ?? getInitialValue()
  },
)
</script>
