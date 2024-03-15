<template>
  <div :class="bem()">
    <div
      v-if="props.direction === 'horizontal'"
      :class="bem('horizontal')"
      :style="{
        borderWidth: `${width}px`,
        borderStyle: borderStyle,
      }"
    >
      <div :class="bem(['title', contentPosition])">
        <slot />
      </div>
    </div>
    <div
      v-else
      :class="bem('vertical')"
      :style="{
        borderWidth: `${width}px`,
        borderStyle: borderStyle,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { DividerProps } from './divider'
import { createCssScope } from '../../utils'

defineOptions({
  name: 'YkDivider',
})

const bem = createCssScope('divider')
const props = withDefaults(defineProps<DividerProps>(), {
  id: '',
  contentPosition: 'left',
  width: '1',
  height: '1',
  borderStyle: 'soild',
  color: '#00aaee',
  direction: 'horizontal',
})
</script>
