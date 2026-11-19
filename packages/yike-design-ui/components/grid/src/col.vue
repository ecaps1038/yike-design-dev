<template>
  <div :class="classes" :style="colStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ColProps, ColSize } from './grid'
import { BREAKPOINTS, rowContextKey } from './grid'

defineOptions({ name: 'YkCol' })

const props = withDefaults(defineProps<ColProps>(), {
  span: undefined,
  offset: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
})

const rowContext = inject(rowContextKey, null)

const colStyle = computed(() => {
  const horizontal = rowContext?.gutter.value[0] ?? 0
  return {
    paddingLeft: horizontal ? `${horizontal / 2}px` : undefined,
    paddingRight: horizontal ? `${horizontal / 2}px` : undefined,
  }
})

function sizeClasses(prefix: string, size: ColSize) {
  const classes: string[] = []
  const value = typeof size === 'number' ? { span: size } : size
  if (value.span) classes.push(`yk-col-${prefix}-${value.span}`)
  if (value.offset) classes.push(`yk-col-${prefix}-offset-${value.offset}`)
  return classes
}

const classes = computed(() => {
  const list: string[] = ['yk-col']
  if (props.span) list.push(`yk-col-${props.span}`)
  if (props.offset) list.push(`yk-col-offset-${props.offset}`)

  BREAKPOINTS.forEach((breakpoint) => {
    const size = props[breakpoint]
    if (size !== undefined) {
      list.push(...sizeClasses(breakpoint, size))
    }
  })
  return list
})
</script>
