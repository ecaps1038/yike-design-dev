<template>
  <div :class="bem({ withMarks: !!marks.length, disabled }, [direction])">
    <div
      ref="runwayRef"
      :class="bem('runway')"
      :style="ykSliderRunwayStyle"
      @click="handleBarClick"
    >
      <div :class="bem('bar')" :style="ykSliderBarStyle">
        <yk-tooltip
          v-if="isRange"
          :class="bem('button', { start: true })"
          :placement="toolTipPlacement"
          :open="moving && !isEndBtn"
          trigger="hover"
          :title="toolTipTitleStart"
          @mousedown="handleStartMouseDown"
        >
          <div :class="bem('tooltipSpan')"></div>
        </yk-tooltip>
        <yk-tooltip
          :class="bem('button', { end: true })"
          :placement="toolTipPlacement"
          :open="moving && isEndBtn"
          trigger="hover"
          :title="toolTipTitleEnd"
          @mousedown="handleEndMouseDown"
        >
          <div :class="bem('tooltipSpan')"></div>
        </yk-tooltip>
      </div>
    </div>
    <slider-marks
      v-model="marks"
      :range-min="min"
      :range-max="max"
      :percent-start="percentBarStart"
      :percent-end="percentBarEnd"
      @position="handlePosition"
    ></slider-marks>
  </div>
</template>

<script setup lang="ts">
import sliderMarks from './slider-marks.vue'
import { computed, ref, toRefs, watch, onMounted } from 'vue'
import { SliderProps, SliderEmits, SliderEmitEvents } from './slider'
import { DIRECTION, createCssScope } from '../../utils'
import { useSlider } from './useSlider'
import { onUnmounted } from 'vue'
defineOptions({
  name: 'YKSlider',
})

const bem = createCssScope('slider')

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  disabled: false,
  min: 0,
  max: 100,
  direction: DIRECTION[1],
  height: 200,
  step: 1,
  marks: () => [],
  showInput: false,
})
const { modelValue, marks, min, max } = toRefs(props)
const runwayRef = ref()
const emits: SliderEmits = defineEmits([
  'update:modelValue',
  'change',
] as SliderEmitEvents[])

const isRange = computed(() => {
  return Array.isArray(modelValue.value)
})
// 滑道区间 - 逻辑长度
const runwayLen = computed(() => {
  return props.max - props.min
})
// 滑道区间 - 渲染长度
const runwayWidth = ref(0)
const setRunwayWidth = () => {
  if (props.direction === DIRECTION[1]) {
    runwayWidth.value = runwayRef.value ? runwayRef.value.offsetWidth : 0
  } else if (props.direction === DIRECTION[0]) {
    runwayWidth.value = runwayRef.value ? runwayRef.value.offsetHeight : 0
  }
}
onMounted(() => {
  setRunwayWidth()
  window.addEventListener('resize', setRunwayWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', setRunwayWidth)
})

// bar 渲染参数
const barStartPoint = ref(0)
const barEndPoint = ref(0)

// bar 开始位置 百分比系数
const percentBarStart = computed(() => {
  if (isRange.value) {
    const modelVal = modelValue.value as number[]
    const value = (modelVal[0] || 0) - props.min
    return Math.round((value / runwayLen.value) * 100) / 100
  } else {
    return 0
  }
})
// bar 结束位置 百分比系数
const percentBarEnd = computed(() => {
  if (isRange.value) {
    const modelVal = modelValue.value as number[]
    const value = (modelVal[1] || 0) - props.min
    return Math.round((value / runwayLen.value) * 100) / 100
  } else {
    const modelVal = modelValue.value as number

    return Math.round((modelVal / runwayLen.value) * 100) / 100
  }
})

// 文本提示 - 开始值
const toolTipTitleStart = computed(() => {
  if (isRange.value) {
    const modelVal = modelValue.value as number[]
    return (modelVal[0] || 0).toString()
  } else {
    return '0'
  }
})
// 文本提示 - 结束值
const toolTipTitleEnd = computed(() => {
  if (isRange.value) {
    const modelVal = modelValue.value as number[]
    return (modelVal[1] || 0).toString()
  } else {
    return modelValue.value.toString()
  }
})
// 文本提示 - 位置
const toolTipPlacement = computed(() => {
  return props.direction === DIRECTION[1] ? 'top' : 'right'
})

const ykSliderRunwayStyle = computed(() => {
  if (props.direction === DIRECTION[1]) {
    return {
      height: '2px',
    }
  } else if (props.direction === DIRECTION[0]) {
    return {
      height: props.height + 'px',
      width: '2px',
    }
  } else {
    return {}
  }
})
const ykSliderBarStyle = computed(() => {
  if (props.direction === DIRECTION[1]) {
    return {
      top: 0,
      height: '2px',
      left: barStartPoint.value + 'px',
      width: barEndPoint.value - barStartPoint.value + 'px',
    }
  } else if (props.direction === DIRECTION[0]) {
    return {
      left: 0,
      width: '2px',
      bottom: barStartPoint.value + 'px',
      height: barEndPoint.value - barStartPoint.value + 'px',
    }
  } else {
    return {}
  }
})

const {
  moving,
  isEndBtn,
  handleStartMouseDown,
  handleEndMouseDown,
  emitValue,
} = useSlider(
  props,
  runwayRef,
  runwayWidth,
  barStartPoint,
  barEndPoint,
  isRange,
  emits,
)

// 监听初始化 和 外部数据变化
watch(
  percentBarStart,
  () => {
    if (!moving.value) {
      barStartPoint.value = percentBarStart.value * runwayWidth.value
    }
  },
  { immediate: true },
)
watch(
  percentBarEnd,
  () => {
    if (!moving.value) {
      barEndPoint.value = percentBarEnd.value * runwayWidth.value
    }
  },
  { immediate: true },
)
watch(
  runwayWidth,
  () => {
    // console.log('🚀 ~ file: slider.vue:177 ~ runwayWidth:', runwayWidth.value)
    barStartPoint.value = percentBarStart.value * runwayWidth.value
    barEndPoint.value = percentBarEnd.value * runwayWidth.value
  },
  { immediate: true },
)

const handlePosition = (percent: number) => {
  if (props.disabled) return
  let _percent = percent / 100
  if (isRange.value) {
    const startDistance = Math.abs(percentBarStart.value - _percent)
    const endDistance = Math.abs(percentBarEnd.value - _percent)
    if (startDistance >= endDistance) {
      barEndPoint.value = _percent * runwayWidth.value
    } else {
      barStartPoint.value = _percent * runwayWidth.value
    }
  } else {
    barEndPoint.value = _percent * runwayWidth.value
  }
  emitValue('update:modelValue')
}
const handleBarClick = (e: MouseEvent) => {
  if (props.disabled) return
  const dom = runwayRef.value as HTMLBaseElement
  const rect = dom.getBoundingClientRect()
  if (props.direction === DIRECTION[1]) {
    const position = e.clientX - rect.left
    let percent = Math.round((position / runwayWidth.value) * 100)
    percent = Math.round(percent / props.step) * props.step
    handlePosition(percent)
  } else if (props.direction === DIRECTION[0]) {
    const position = runwayWidth.value - (e.clientY - rect.top)
    let percent = Math.round((position / runwayWidth.value) * 100)
    percent = Math.round(percent / props.step) * props.step
    handlePosition(percent)
  }
}
</script>
