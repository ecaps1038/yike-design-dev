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
import { provide } from 'vue'
import { TimelineProps } from './timeline'
import '../style'

import { createCssScope } from '../../utils/bem'
const bem = createCssScope('timeline')

const props = withDefaults(defineProps<TimelineProps>(), {
  horizontal: false,
  placement: 'right',
  reverse: false,
})
provide('horizontal', props.horizontal)
provide('placement', props.placement)
</script>
