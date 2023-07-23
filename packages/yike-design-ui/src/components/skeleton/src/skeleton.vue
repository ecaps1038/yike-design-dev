<template>
  <div :class="cls">
    <slot v-if="loading" />
    <slot v-else name="content" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { SkeletonProps } from './skeleton'
import '../style'
defineOptions({
  name: 'YkSkeleton',
})
const props = withDefaults(defineProps<SkeletonProps>(), {
  loading: true,
  animation: false,
})

const cls = computed(() => [
  'yk-skeleton',
  {
    ['yk-skeleton-animation']: props.animation,
  },
])
</script>
