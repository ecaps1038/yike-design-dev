<template>
  <div class="yk-progress">
    <div :class="['yk-progress-inner', ykProgressSizeCls]"></div>
    <div class="yk-progress-text">
      <slot v-if="props.showInfo" name="format" :percent="props.percent">
        <div>{{ progressInnerStyle.w }}</div>
        <div class="yk-progress-icon" :style="{ color: setProgressState }">
          <yk-icon :name="getIconName(props.status)"></yk-icon>
        </div>
      </slot>
    </div>
  </div>
</template>
d
<script setup lang="ts">
import { computed } from 'vue'
import { getIconColor, getIconName } from './util'
import { ProgressProps } from './progress'
import '../style'
defineOptions({
  name: 'YkProgress',
})
// props
const props = withDefaults(defineProps<ProgressProps>(), {
  type: 'line', // 类型
  percent: 20, // 进度条百分比
  strokeColor: '#000', // 轨道颜色
  size: 'm',
  status: 'normal',
  showInfo: true, // 是否显示文字
})
// 绑定尺寸class
const ykProgressSizeCls = computed(() => {
  return `yk-progress--${props.size}`
})

// 对应进度条状态颜色
const setProgressState = computed(() => getIconColor(props.status))

const progressInnerStyle = computed(() => ({
  w: `${props.percent}%`,
  bgColor: `${props.strokeColor}`,
}))
</script>
<style lang="less">
@progress-inner-w: v-bind('progressInnerStyle.w');
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
