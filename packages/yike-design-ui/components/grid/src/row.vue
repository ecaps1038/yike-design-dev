<template>
  <div
    :class="bem([`justify-${justify}`, `align-${align}`], { nowrap: !wrap })"
    :style="rowStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { createCssScope } from '../../utils'
import type { RowProps } from './grid'
import { rowContextKey } from './grid'

defineOptions({ name: 'YkRow' })

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'start',
  wrap: true,
})

const bem = createCssScope('row')

const gutter = computed<[number, number]>(() =>
  Array.isArray(props.gutter) ? props.gutter : [props.gutter, 0],
)

provide(rowContextKey, { gutter })

const rowStyle = computed(() => {
  const [horizontal, vertical] = gutter.value
  return {
    marginLeft: horizontal ? `${-horizontal / 2}px` : undefined,
    marginRight: horizontal ? `${-horizontal / 2}px` : undefined,
    rowGap: vertical ? `${vertical}px` : undefined,
  }
})
</script>
