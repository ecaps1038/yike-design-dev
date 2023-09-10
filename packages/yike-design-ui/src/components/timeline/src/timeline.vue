<template>
  <div
    :class="[
      bem(
        {
          horizontal: horizontal,
          reverse: reverse,
          reverseHorizontal: horizontal && reverse,
        },
        placement !== 'alternate' ? [placement] : [],
      ),
      placement === 'alternate'
        ? bem('alternate', { horizontal: horizontal })
        : '',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import { TimelineProps } from './timeline'
import { createCssScope } from '../../utils'
import { timelineContextKey } from './internal'

defineOptions({
  name: 'YkTimeline',
})

const bem = createCssScope('timeline')

const props = withDefaults(defineProps<TimelineProps>(), {
  horizontal: false,
  placement: 'right',
  reverse: false,
})
provide(
  timelineContextKey,
  reactive({
    horizontal: props.horizontal,
    placement: props.placement,
  }),
)
</script>
