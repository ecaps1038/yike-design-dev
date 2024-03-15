<template>
  <div class="yk-space" :class="classList" :style="spaceStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, CSSProperties } from 'vue'
import type { SpaceProps } from './space'
import '../style'

defineOptions({ name: 'YkSpace' })
// prettier-ignore
const props = withDefaults(
  defineProps<SpaceProps>(),
  {
    size: 'l',
    dir: 'horizontal',
    overflow: 'visible',
    wrap: false,
    inline: false,
  }
)

// prettier-ignore
const {
  inline,
  align,
  justify,
  wrap,
  overflow,
  size,
  dir
} = toRefs(props)

const isNumber = (num: any) => typeof num === 'number'
const isString = (str: any) => typeof str === 'string'
const isBoolean = (bool: any) => typeof bool === 'boolean'

const classList = computed(() => {
  const classes: string[] = []

  if (inline.value) classes.push(`inline`)

  if (isBoolean(wrap.value)) {
    wrap.value && classes.push(`wrap`)
  } else {
    classes.push(`wrap-${wrap.value}`)
  }

  if (isString(size.value) && size.value !== 'l') {
    classes.push(`size-${size.value}`)
  }

  if (dir.value !== 'horizontal') {
    classes.push(`dir-${dir.value}`)
  }

  if (overflow.value !== 'visible') {
    classes.push(`overflow-${overflow.value}`)
  }

  classes.push(`align-${align?.value}`)
  classes.push(`justify-${justify?.value}`)

  return classes
})

const spaceStyle = computed(() => {
  const style: CSSProperties = {}

  if (isNumber(size.value)) {
    style.gap = `${size.value}px`
  } else if (isString(size.value)) {
    style.gap = `${size.value}`
  } else if (Array.isArray(size.value)) {
    const [columnGap, rowGap] = size.value

    if (isNumber(columnGap) && isNumber(rowGap)) {
      style.columnGap = `${size.value[0]}px`
      style.rowGap = `${size.value[1]}px`
    } else {
      style.columnGap = `${size.value[0]}`
      style.rowGap = `${size.value[1]}`
    }
  }

  if (Array.isArray(overflow.value)) {
    const [overflowX, overflowY] = overflow.value

    style.overflowX = overflowX
    style.overflowY = overflowY
  }

  return style
})
</script>
