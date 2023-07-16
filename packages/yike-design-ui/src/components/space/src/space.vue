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
  align: 'start',
  wrap: false,
  size: 'l',
  direction: 'horizontal',
})
const { align, wrap, size, direction } = toRefs(props)

const resolveGap = (): CSSProperties => {
  if (Array.isArray(size.value)) {
    return {
      rowGap: `${size.value[1]}px`,
      columnGap: `${size.value[0]}px`,
    }
  } else {
    return {
      gap: `${getMargin(size.value)}px`,
    }
  }
}

const spaceStyle = computed<CSSProperties>(() => {
  return {
    flexWrap: wrap.value ? 'wrap' : 'nowrap',
    flexDirection: flexDirection(direction.value),
    alignItems: getAlign(align.value),
    ...resolveGap(),
  }
})
</script>
