<template>
  <div class="yk-progress">
    <template v-if="props.type === 'line'">
      <div class="yk-progress-line-wrapper">
        <div
          :class="['yk-progress-inner', ykProgressSizeCls[props.type]]"
          :style="{
            '--progress-inner-w': progressPercent,
            '--progress-inner-color': setProgressState,
          }"
        ></div>
        <div v-if="props.showText" class="yk-progress-text">
          <slot name="format" :percent="props.percent">
            <div>{{ progressPercent }}</div>
            <div
              v-if="getIconName(props.status)"
              class="yk-progress-icon"
              :style="{ color: getIconColor(props.status) }"
            >
              <component :is="getIconName(props.status)"></component>
            </div>
          </slot>
        </div>
      </div>
    </template>
    <template v-else-if="props.type === 'circle'">
      <div
        :class="['yk-progress-circle-wrapper', ykProgressSizeCls[props.type]]"
      >
        <svg class="yk-progress-svg" :style="ykProgressCircleStyle.svgWh">
          <circle
            :r="ykProgressCircleStyle.r"
            :cx="ykProgressCircleStyle.cx"
            :cy="ykProgressCircleStyle.cy"
            :stroke-width="ykProgressCircleStyle.strokeWidth"
            fill="transparent"
            class="yk-progress-circle"
            stroke="#e8e8e8"
          ></circle>
          <circle
            :r="ykProgressCircleStyle.r"
            :cx="ykProgressCircleStyle.cx"
            :cy="ykProgressCircleStyle.cy"
            :stroke-width="ykProgressCircleStyle.strokeWidth"
            fill="transparent"
            class="yk-progress-circle"
            :stroke="setProgressState"
            :stroke-dasharray="progressValues.circumference"
            :stroke-dashoffset="progressValues.dashoffset"
          ></circle>
        </svg>
        <div v-if="props.showText" class="yk-progress-circle-text">
          <slot name="format" :percent="props.percent">
            <div
              v-if="getIconName(props.status)"
              class="yk-progress-circle-icon"
              :style="{ color: getIconColor(props.status) }"
            >
              <component :is="getIconName(props.status, true)"></component>
            </div>
            <div v-else>{{ progressPercent }}</div>
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { getIconColor, getIconName, getSvgSize } from './util'
import { ProgressProps } from './progress'
defineOptions({
  name: 'YkProgress',
})
const props = withDefaults(defineProps<ProgressProps>(), {
  type: 'line',
  percent: 20,
  strokeColor: '', // 轨道颜色
  size: 'm',
  status: 'normal',
  showText: true, // 是否显示文字
})
// 进度条百分比
const progressPercent = computed(() => props.percent + '%')
// 绑定尺寸class
const ykProgressSizeCls = computed(() => ({
  line: `yk-progress--${props.size}`,
  circle: `yk-progress-circle--${props.size}`,
}))

// 设置进度条颜色
const setProgressState = computed(
  () => getIconColor(props.status) || props.strokeColor,
)
// 环形进度条
const ykProgressCircleStyle = computed(() => {
  const sizeVal = getSvgSize(props.size)
  const strokeWidth = Number(sizeVal.charAt(0)) - 1
  const val = Number(sizeVal) / 2
  return {
    svgWh: `width:${val * 2}px;height:${val * 2}px`,
    strokeWidth,
    r: (Number(sizeVal) - strokeWidth) / 2,
    cx: val,
    cy: val,
  }
})
// 环形进度值
const progressValues = computed(() => {
  const { percent } = props
  const { r } = ykProgressCircleStyle.value
  const isMax = percent >= 100
  const offset = percent === 50 ? 0 : 1
  const circumference = 2 * Math.PI * (isMax ? r : r - offset)
  const val = circumference * (1 - percent / 100)
  return {
    circumference,
    dashoffset: isMax ? percent / 100 : val,
  }
})
</script>
