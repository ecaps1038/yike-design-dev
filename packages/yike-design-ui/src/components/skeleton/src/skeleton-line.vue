<template>
  <ul v-for="(style, index) in lines" :key="index" class="yk-skeleton-line">
    <li class="yk-skeleton-line-row" :style="style"></li>
  </ul>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { SkeletonLineProps } from './skeleton'
import { isNumber, isString } from '../../../utils/tools'
defineOptions({
  name: 'YkSkeletonLine',
})
const props = withDefaults(defineProps<SkeletonLineProps>(), {
  rows: 1,
  widths: () => [],
  lineHeight: 20,
  lineSpacing: 15,
})

const lines: CSSProperties[] = []
for (let i = 0; i < props.rows; i++) {
  const style: CSSProperties = {}
  if (isNumber(props.widths[i])) {
    style.width = `${props.widths[i]}px`
  } else if (isString(props.widths[i])) {
    style.width = String(props.widths[i])
  }
  style.height = `${props.lineHeight}px`
  if (i > 0) {
    style.marginTop = `${props.lineSpacing}px`
  }
  lines.push(style)
}
</script>
