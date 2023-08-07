<template>
  <YkInput
    ref="inputRef"
    v-model:value="displayValue"
    :disabled="disabled"
    :size="size"
    :class="bem()"
    v-bind="$attrs"
    @change="change"
    @hoverin="isHovering = true"
    @hoverout="isHovering = false"
    @keydown="keydown"
  >
    <template #suffix>
      <div
        v-show="!disabled && isHovering"
        :class="[bem('buttons'), bem([size])]"
      >
        <YkButton
          :disabled="limit.isMax"
          type="secondary"
          @click="increase"
          @mousedown="startCombo(1)"
        >
          <IconUpOutline />
        </YkButton>
        <YkButton
          :disabled="limit.isMin"
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
import { createCssScope } from '../../utils/bem'
import { YkInput, YkButton } from '../../../index'
import { InputNumberProps } from './input-number'
import { toRefs, ref, onMounted, reactive, computed } from 'vue'
import { calculate, numberMatchReg } from './utils'

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
})

const bem = createCssScope('input-number')
const emits = defineEmits(['update:value', 'increase', 'decrease'])
const isHovering = ref<boolean>(false)
const limit = reactive({
  isMax: false,
  isMin: false,
})
// 触发“连击”的所需时间
const TimeBeforeCombo = 250
// “连击”的速度
const ComboSpeed = 150
const inputRef = ref<InstanceType<typeof YkInput>>()
const valueRefs = toRefs(props)
const lastValue = ref<number>(0)
const displayValue = ref<string | number>('')

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

const getDisplayValue = () => {
  return lastValue.value!.toFixed(precision.value)
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
const checkLimit = () => {
  limit.isMax = lastValue.value >= valueRefs.max.value ? true : false
  limit.isMin = lastValue.value <= valueRefs.min.value ? true : false
}

onMounted(() => {
  lastValue.value = valueRefs.value?.value ?? getInitialValue()
  checkLimit()

  if (props.value) {
    displayValue.value = getDisplayValue()
  }
})

const increase = () => {
  if (lastValue.value >= valueRefs.max.value) {
    return
  }
  lastValue.value = calculate(
    lastValue.value,
    valueRefs.step.value,
    precision.value,
  )
  update()
  emits('increase')
}

const decrease = () => {
  if (lastValue.value <= valueRefs.min.value) {
    return
  }
  lastValue.value = calculate(
    lastValue.value,
    -valueRefs.step.value,
    precision.value,
  )
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

const change = (value: string) => {
  // 使用正则匹配数字 不合法视为 ‘0’
  lastValue.value = value
    ? Number((value.match(numberMatchReg) ?? ['0'])[0])
    : 0
  if (precision.value === 0) {
    lastValue.value = Math.trunc(lastValue.value)
  }
  checkLimit()
}

const update = () => {
  checkLimit()
  displayValue.value = getDisplayValue()
  emits('update:value', displayValue.value)
}
</script>
