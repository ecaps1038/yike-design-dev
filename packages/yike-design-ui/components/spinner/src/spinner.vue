<template>
  <span :style="outerStyle" :class="bem()">
    <svg viewBox="25 25 50 50">
      <circle :style="circleStyle" r="20" cy="50" cx="50"></circle>
    </svg>
  </span>
</template>

<script setup lang="ts">
import { SpinnerProps, resolveSize, resolveColor } from './spinner'
import { createCssScope } from '../../utils'
import { computed } from 'vue'
import '../style'

defineOptions({
  name: 'YkSpinner',
})

const bem = createCssScope('spinner')
const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 16,
  color: 'primary',
  strokeWidth: 3,
})

const outerStyle = computed(() => {
  const computedSize = resolveSize(props.size)
  return {
    width: `${computedSize}px`,
    height: `${computedSize}px`,
  }
})

const circleStyle = computed(() => {
  return {
    stroke: resolveColor(props.color),
    strokeWidth: props.strokeWidth,
  }
})
</script>
