<template>
  <div class="yk-progress">
    <template v-if="props.type === 'line'">
      <div :class="['yk-progress-inner', ykProgressSizeCls]"></div>
      <div class="yk-progress-text">
        <slot v-if="props.showInfo" name="format" :percent="props.percent">
          <div>{{ progressPercent }}</div>
          <div
            v-if="getIconName(props.status)"
            class="yk-progress-icon"
            :style="{ color: getIconColor(props.status) }"
          >
            <yk-icon :name="getIconName(props.status)"></yk-icon>
          </div>
        </slot>
      </div>
    </template>
    <template v-else-if="props.type === 'circle'">
      <div :class="['yk-progress-circle-wrapper', ykProgressCircleSizeCls]">
        <svg
          class="yk-progress-svg"
          :width="getSvgSize(props.size) + 'px'"
          :height="getSvgSize(props.size) + 'px'"
        >
          <circle
            :r="ykProgressCircleStyle.r"
            :cx="ykProgressCircleStyle.cx"
            :cy="ykProgressCircleStyle.cy"
            :stroke-width="ykProgressCircleStyle.strokeWidth"
            fill="none"
            class="yk-progress-circle"
            stroke="#e8e8e8"
          ></circle>
          <circle
            :r="ykProgressCircleStyle.r"
            :cx="ykProgressCircleStyle.cx"
            :cy="ykProgressCircleStyle.cy"
            :stroke-width="ykProgressCircleStyle.strokeWidth"
            fill="none"
            class="yk-progress-circle"
            :stroke="setProgressState"
            :stroke-dasharray="progressValues.circumference"
            :stroke-dashoffset="progressValues.val"
          ></circle>
        </svg>
      </div>
    </template>
  </div>
</template>
<!-- feat(progress): 完善progress组件 -->
<script setup lang="ts">
import { computed } from 'vue'
import { getIconColor, getIconName, getSvgSize } from './util'
import { ProgressProps } from './progress'
import '../style'
defineOptions({
  name: 'YkProgress',
})
// props
const props = withDefaults(defineProps<ProgressProps>(), {
  type: 'line', // 类型
  percent: 20, // 进度条百分比
  strokeColor: '', // 轨道颜色
  size: 'm',
  status: 'normal',
  showInfo: true, // 是否显示文字
})
// 百分比
const progressPercent = computed(() => props.percent + '%')
// 绑定尺寸class
const ykProgressSizeCls = computed(() => `yk-progress--${props.size}`)

// 设置进度条颜色
const setProgressState = computed(() => {
  return (
    props.strokeColor || getIconColor(props.status) || getIconColor('normal')
  )
})
// -----------------------环形进度条
// 绑定圆形进度条尺寸class
const ykProgressCircleSizeCls = computed(
  () => `yk-progress-circle--${props.size}`,
)

const ykProgressCircleStyle = computed(() => {
  const { size } = props
  const strokeWidth = 5
  const val = getSvgSize(size) / 2
  return {
    strokeWidth,
    svgViewBox: `0 0 ${getSvgSize(size)} ${getSvgSize(size)}`,
    r: (getSvgSize(size) - strokeWidth) / 2,
    cx: val,
    cy: val,
  }
})

// 环形进度值
const progressValues = computed(() => {
  const { percent } = props
  const { r } = ykProgressCircleStyle.value
  const isMax = percent >= 100
  const circumference = 2 * Math.PI * (isMax ? r : r - 1)
  return {
    circumference,
    val: isMax
      ? percent / 100
      : circumference - (percent / 100) * circumference,
  }
})
// watch(props.percent, (newValue) => {
//   progressValue.value = (newValue / 100) * 250
// })
</script>
<style lang="less">
@progress-inner-w: v-bind(progressPercent);
@progress-inner-color: v-bind(setProgressState);

.yk-progress {
  .yk-progress-inner::before {
    position: absolute;
    top: 0;
    left: 0;
    width: @progress-inner-w;
    height: 100%;
    border-radius: @radius-s;
    background-color: @progress-inner-color;
    content: '';
  }
}
</style>
