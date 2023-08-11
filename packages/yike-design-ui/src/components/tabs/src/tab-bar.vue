<template>
  <div :class="[ns()]" :style="calcStyle"></div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
import { createCssScope } from '../../utils/bem'
import { TabBar } from './tabBar'
const ns = createCssScope('tabs-bar')
const props = withDefaults(defineProps<TabBar>(), {
  offset: 0,
  direction: 'horizontal',
  width: 0,
})

const calcStyle = computed<CSSProperties>(() => {
  return {
    transform: `translateX(${props.offset}px)`,
    width: `${props.width}px`,
  }
})
</script>

<style scoped></style>
