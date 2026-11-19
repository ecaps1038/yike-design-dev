<template>
  <div :class="classes" :style="flexStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createCssScope } from '../../utils'
import type { FlexGap, FlexProps } from './flex'

defineOptions({ name: 'YkFlex' })

const props = withDefaults(defineProps<FlexProps>(), {
  vertical: false,
  justify: 'start',
  align: 'stretch',
  gap: undefined,
  wrap: false,
  inline: false,
})

const bem = createCssScope('flex')

const GAP_MAP: Record<string, number> = {
  ss: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
}

function resolveGap(gap?: FlexGap) {
  if (gap === undefined) return undefined
  if (typeof gap === 'number') return `${gap}px`
  if (typeof gap === 'string') {
    if (gap in GAP_MAP) return `${GAP_MAP[gap]}px`
    // 兼容 gap="8" 这类数字字符串
    if (/^\d+(\.\d+)?$/.test(gap)) return `${gap}px`
  }
  return gap
}

const classes = computed(() =>
  bem({
    vertical: props.vertical,
    wrap: props.wrap,
    inline: props.inline,
    [`justify-${props.justify}`]: true,
    [`align-${props.align}`]: true,
  }),
)

const flexStyle = computed(() => ({ gap: resolveGap(props.gap) }))
</script>
