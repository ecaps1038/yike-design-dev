<template>
  <div :class="cls"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { SkeletonShapeProps } from './skeleton'
import '../style'
defineOptions({
  name: 'YkSkeletonShape',
})
const props = withDefaults(defineProps<SkeletonShapeProps>(), {
  shape: 'square',
  size: 'medium',
})

const cls = computed(() => [
  'yk-skeleton-shape',
  {
    [`yk-skeleton-shape-${props.shape}`]: props.shape,
    [`yk-skeleton-shape-${props.size}`]: props.size,
  },
])
</script>
