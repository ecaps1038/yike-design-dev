<template>
  <div :class="bem()">
    <div :class="bem('timeline')">
      <span
        :class="[bem('timeline__tail', { horizontal: horizontal })]"
        :style="
          horizontal
            ? { borderTopStyle: lineType }
            : { borderLeftStyle: lineType }
        "
      ></span>
      <div
        :class="[
          bem('timeline__dot-item', {
            horizontal: horizontal,
            pending: pending,
          }),
        ]"
      >
        <slot name="dot">
          <svg v-if="pending" viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
          <span
            v-else
            :class="[bem('timeline__dot-item__dot')]"
            :style="dotColor ? { background: dotColor } : {}"
          ></span>
        </slot>
      </div>
    </div>
    <div ref="desc" :class="bem('desc')">
      <slot name="title">
        <span :class="bem('desc__title')">{{ title || '--' }}</span>
      </slot>
      <slot name="content">
        <span :class="bem('desc__content')">{{ content }}</span>
      </slot>
      <slot name="time">
        <span :class="bem('desc__time')">{{ time }}</span>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { TimelineItemProps } from './timelineitem'
import '../style'
import { createCssScope } from '../../utils/bem'
const bem = createCssScope('timeline__item')

withDefaults(defineProps<TimelineItemProps>(), {
  lineType: 'solid',
  pending: false,
})

const horizontal = inject('horizontal') as boolean
</script>
