<template>
  <svg :class="cls" :style="innerStyle" fill="currentColor">
    <slot />
  </svg>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'

defineOptions({
  name: 'YkIcon',
})

const props = defineProps({
  type: String,
  size: [Number, String],
  rotate: Number,
  spin: Boolean,
})

const innerStyle = computed(() => {
  const styles: CSSProperties = {}
  if (props.size) {
    styles.fontSize =
      typeof props.size === 'number' ? `${props.size}px` : props.size
  }
  if (props.rotate) {
    styles.transform = `rotate(${props.rotate}deg)`
  }
  return styles
})

const cls = computed(() => ['yk-icon'])
</script>
