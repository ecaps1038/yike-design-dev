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
  direction: 'horizontal',
})
const { aline, wrap, size, direction } = toRefs(props)

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
  console.log(resolveGap())
  return {
    flexWrap: wrap.value ? 'wrap' : 'nowrap',
    flexDirection: flexDirection(direction.value),
    alignItems: getAlign(aline.value),
    ...resolveGap(),
  }
})
</script>
