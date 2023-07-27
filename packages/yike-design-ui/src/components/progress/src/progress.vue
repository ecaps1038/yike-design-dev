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
          :viewBox="`0 0 ${getSvgSize(props.size)} ${getSvgSize(props.size)}`"
        >
          <circle
            :r="getSvgSize(props.size)"
            :cx="getSvgSize(props.size)"
            :cy="getSvgSize(props.size)"
            fill="none"
            stroke-miterlimit="20"
            stroke-width="10"
            class="yk-progress-circle"
            style="stroke-dasharray: 275, 279.602; stroke: #e8e8e8"
          ></circle>
          <circle
            :r="getSvgSize(props.size)"
            :cx="getSvgSize(props.size)"
            :cy="getSvgSize(props.size)"
            fill="none"
            stroke-miterlimit="20"
            stroke-width="10"
            class="yk-progress-circle"
            :style="`stroke-dasharray: ${progressValue}, 279.602;stroke:${'red'};`"
          ></circle>
        </svg>
      </div>
    </template>
  </div>
</template>
d
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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

// const ykProgressCircleStyle = computed(() => {
//   return {
//     svgViewBox: `0 0 ${getSvgSize(props.size)} ${getSvgSize(props.size)}`,
//     r: getSvgSize(props.size),
//     cx: getSvgSize(props.size),
//     cy: getSvgSize(props.size),
//   }
// })

// 环形进度条
const progressValue = ref((props.percent / 100) * 250)
watch(props.percent, (newValue) => {
  progressValue.value = (newValue / 100) * 250
})
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
