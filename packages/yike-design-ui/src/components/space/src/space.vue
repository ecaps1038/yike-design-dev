<template>
  <div class="yk-space" :style="spaceStyle">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { getMargin, getAlign, flexDirection } from './utils'
import { SpaceProps } from './space'
import { CSSProperties, computed, toRefs } from 'vue'

// FIXME 之后不需要在这边引样式
import '../style'

defineOptions({
  name: 'YkSpace',
})

const props = withDefaults(defineProps<SpaceProps>(), {
  aline: 'start',
  wrap: false,
  size: 'l',
  rsize: 'l',
  direction: 'horizontal',
})
const { aline, wrap, size, rsize, direction } = toRefs(props)

const spaceStyle = computed<CSSProperties>(() => {
  return {
    columnGap: getMargin(size.value) + 'px',
    rowGap: getMargin(rsize.value) + 'px',
    flexWrap: wrap.value ? 'wrap' : 'nowrap',
    flexDirection: flexDirection(direction.value),
    alignItems: getAlign(aline.value),
  }
})
</script>
