<template>
  <div :class="[ns()]" :style="calcStyle"></div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
import { createCssScope } from '../../utils'
import { TabBar } from './tabBar'

defineOptions({
  name: 'YkTabBar',
})

const ns = createCssScope('tabs-bar')
const props = withDefaults(defineProps<TabBar>(), {
  offset: 0,
  direction: 'horizontal',
  width: 0,
})

const calcStyle = computed<CSSProperties>(() => {
  const dir = props.direction === 'horizontal' ? 'X' : 'Y'
  return {
    transform: `translate${dir}(${props.offset}px)`,
    width: dir === 'X' ? `${props.width}px` : '',
    height: dir === 'Y' ? `${props.width}px` : '',
  }
})
</script>
