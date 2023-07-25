<template>
  <div class="yk-progress">
    <div
      class="yk-progress-inner"
      :style="{ height: progressInnerStyle.h }"
    ></div>
    <div class="yk-progress__text">
      <slot v-if="props.showInfo" name="text">
        {{ progressInnerStyle.w }}
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { ProgressProps } from './progress'
import '../style'
defineOptions({
  name: 'YkProgress',
})
// props
const props = withDefaults(defineProps<ProgressProps>(), {
  type: 'line',
  height: 6,
  percent: 20,
  strokeColor: '#2B5AED',
  status: 'success',
  showInfo: true,
})

const progressInnerStyle = computed(() => ({
  w: `${props.percent}%`,
  h: `${props.height}px`,
  bgColor: `${props.strokeColor}`,
}))
</script>
<style lang="less">
@progress-inner-w: v-bind('progressInnerStyle.w');
@progress-inner-bg: v-bind('progressInnerStyle.bgColor');

.yk-progress {
  .yk-progress-inner::before {
    position: absolute;
    top: 0;
    left: 0;
    width: @progress-inner-w;
    height: 100%;
    border-radius: @radius-s;
    background-color: @progress-inner-bg;
    content: '';
  }
}
</style>
