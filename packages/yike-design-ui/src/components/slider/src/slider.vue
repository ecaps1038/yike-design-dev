<template>
  <div :class="bem({ withMarks: !!marks.length, disabled }, [direction])">
    <div
      ref="runwayRef"
      :class="bem('runway')"
      :style="ykSliderRunwayStyle"
      @click="handleBarClick"
    >
      <div :class="bem('bar')" :style="ykSliderBarStyle">
        <div
          v-if="isRange"
          :class="bem('button', { start: true })"
          @mousedown="handleStartMouseDown"
        ></div>
        <div
          :class="bem('button', { end: true })"
          @mousedown="handleEndMouseDown"
        ></div>
      </div>
    </div>
    <slider-marks
      v-model="props.marks"
      :percent-start="percentBarStart"
      :percent-end="percentBarEnd"
      @position="handlePosition"
    ></slider-marks>
  </div>
</template>

<script setup lang="ts">
import sliderMarks from './slider-marks.vue'
import { computed, ref, toRefs, watch } from 'vue'
import { createCssScope } from '../../utils'
import {
  SliderProps,
  DirectionType,
  SliderEmits,
  SliderEmitEvents,
} from './slider'
import { useSlider } from './useSlider'
defineOptions({
  name: 'YKSlider',
})

const bem = createCssScope('slider')

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  disabled: false,
  min: 0,
  max: 100,
  direction: DirectionType.HORIZONTAL,
  height: 200,
  step: 1,
  marks: () => [],
  showInput: false,
})
const { modelValue } = toRefs(props)
const runwayRef = ref()
const emits: SliderEmits = defineEmits([
  'update:modelValue',
  'change',
] as SliderEmitEvents[])

const isRange = computed(() => {
  return Array.isArray(modelValue.value)
})
const runwayLen = computed(() => {
  return props.max - props.min
})
const runwayWidth = computed(() => {
  if (props.direction === DirectionType.HORIZONTAL) {
    return runwayRef.value ? runwayRef.value.offsetWidth : 0
  } else if (props.direction === DirectionType.VERTICAL) {
    return runwayRef.value ? runwayRef.value.offsetHeight : 0
  } else {
    return 0
  }
})

// bar 开始位置 百分比
const percentBarStart = computed(() => {
  if (isRange.value) {
    const modelVal = modelValue.value as number[]
    const value = (modelVal[0] || 0) - props.min
    return Math.round((value / runwayLen.value) * 100) / 100
  } else {
    return 0
  }
})
// bar 所占的百分比
const percentBarEnd = computed(() => {
  if (isRange.value) {
    const modelVal = modelValue.value as number[]
    const value = (modelVal[1] || 0) - (modelVal[0] || 0)
    return Math.round((value / runwayLen.value) * 100) / 100
  } else {
    const modelVal = modelValue.value as number

    return Math.round((modelVal / runwayLen.value) * 100) / 100
  }
})

const barStartPoint = ref(0)
const barEndPoint = ref(0)

const ykSliderRunwayStyle = computed(() => {
  if (props.direction === DirectionType.HORIZONTAL) {
    return {
      height: '2px',
    }
  } else if (props.direction === DirectionType.VERTICAL) {
    return {
      height: props.height + 'px',
      width: '2px',
    }
  } else {
    return {}
  }
})
const ykSliderBarStyle = computed(() => {
  if (props.direction === DirectionType.HORIZONTAL) {
    return {
      top: 0,
      height: '2px',
      left: barStartPoint.value + 'px',
      width: barEndPoint.value + 'px',
    }
  } else if (props.direction === DirectionType.VERTICAL) {
    return {
      left: 0,
      width: '2px',
      bottom: barStartPoint.value + 'px',
      height: barEndPoint.value + 'px',
    }
  } else {
    return {}
  }
})

const { moving, handleStartMouseDown, handleEndMouseDown } = useSlider(
  props,
  runwayRef,
  barStartPoint,
  barEndPoint,
  isRange,
  emits,
)

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
    barStartPoint.value = percentBarStart.value * runwayWidth.value
    barEndPoint.value = percentBarEnd.value * runwayWidth.value
  },
  { immediate: true },
)

const handlePosition = (percent: number) => {
  if (isRange.value) {
    const modelVal = modelValue.value as number[]
    const startDistance = Math.abs(modelVal[0] - percent)
    const endDistance = Math.abs(modelVal[1] - percent)
    if (startDistance >= endDistance) {
      modelVal[1] = percent
    } else {
      modelVal[0] = percent
    }
    emits('update:modelValue', modelVal)
  } else {
    emits('update:modelValue', percent)
  }
}
const handleBarClick = (e: MouseEvent) => {
  const dom = runwayRef.value as HTMLBaseElement
  const rect = dom.getBoundingClientRect()
  if (props.direction === DirectionType.HORIZONTAL) {
    const position = e.pageX - rect.left
    const percent = Math.round((position / runwayWidth.value) * 100)
    handlePosition(percent)
  } else if (props.direction === DirectionType.VERTICAL) {
    const position = runwayWidth.value - (e.clientY - rect.top)
    const percent = Math.round((position / runwayWidth.value) * 100)
    handlePosition(percent)
  }
}
</script>
