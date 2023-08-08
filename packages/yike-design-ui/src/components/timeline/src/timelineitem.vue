<template>
  <div
    :class="[
      'yk-timeline__item',
      horizontal ? 'yk-timeline__item--horizontal' : '',
      horizontal
        ? `${placement === 'top' ? 'yk-timeline__item--top' : ''}`
        : `${placement === 'left' ? 'yk-timeline__item--left' : ''}`,
    ]"
  >
    <div class="yk-timeline__item__timeline">
      <span
        :class="
          horizontal
            ? 'yk-timeline__item__timeline__tail--horizontal'
            : 'yk-timeline__item__timeline__tail'
        "
        :style="
          horizontal
            ? { borderTopStyle: lineType }
            : { borderLeftStyle: lineType }
        "
      ></span>
      <div
        :class="[
          'yk-timeline__item__timeline__dot-item',
          pending ? 'yk-timeline__item__timeline__dot-item__dot--pending' : '',
        ]"
      >
        <slot name="dot">
          <svg v-if="pending" viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
          <span
            v-else
            class="yk-timeline__item__timeline__dot-item__dot"
            :style="dotColor ? { background: dotColor } : {}"
          ></span>
        </slot>
      </div>
    </div>
    <div ref="desc" class="yk-timeline__item__desc">
      <slot name="title">
        <span class="yk-timeline__item__desc__title">{{ title || '--' }}</span>
      </slot>
      <slot name="content">
        <span class="yk-timeline__item__desc__content">{{ content }}</span>
      </slot>
      <slot name="time">
        <span class="yk-timeline__item__desc__time">{{ time }}</span>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { TimelinePlacement } from '../../utils/constant'
import { TimelineItemProps } from './timelineitem'
import '../style'

withDefaults(defineProps<TimelineItemProps>(), {
  lineType: 'solid',
  pending: false,
})

const horizontal = inject('horizontal') as boolean
const placement = inject('itemPlacement') as TimelinePlacement
</script>
