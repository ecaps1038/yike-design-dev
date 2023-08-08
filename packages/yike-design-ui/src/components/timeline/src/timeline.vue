<template>
  <div
    :class="[
      'yk-timeline',
      horizontal ? 'yk-timeline--horizontal' : '',
      placement !== 'alternate'
        ? `yk-timeline--${placement}`
        : horizontal
        ? 'yk-timeline--alternate--horizontal'
        : `yk-timeline--${placement}`,
      reverse ? 'yk-timeline--reverse' : 'yk-timeline--no-reverse',
    ]"
    :style="
      horizontal && reverse
        ? { flexDirection: 'row-reverse' }
        : !horizontal && reverse
        ? { flexDirection: 'column-reverse' }
        : {}
    "
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { TimelineProps } from './timeline'
import '../style'

const props = withDefaults(defineProps<TimelineProps>(), {
  horizontal: false,
  placement: 'right',
  reverse: false,
})
provide('horizontal', props.horizontal)
provide('placement', props.placement)
</script>
