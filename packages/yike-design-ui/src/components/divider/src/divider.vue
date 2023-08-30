<template>
  <div :class="bem()">
    <div
      v-if="props.direction === 'horizontal'"
      :class="bem('horizontal')"
      :style="{
        borderWidth: `${width}px`,
        borderColor: color,
        borderStyle: borderStyle,
      }"
    >
      <div
        :class="bem(['title', contentPosition])"
        :style="{
          fontSize: `${fontSize}px`,
          color: fontColor,
        }"
      >
        <slot />
      </div>
    </div>
    <div
      v-else
      :class="bem('vertical')"
      :style="{
        borderWidth: `${width}px`,
        borderColor: color,
        borderStyle: borderStyle,
      }"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { DividerProps } from './divider'
import { createCssScope } from '../../utils/bem'
const bem = createCssScope('divider')
defineOptions({
  name: 'YkDivider',
})
const props = withDefaults(defineProps<DividerProps>(), {
  id: '',
  contentPosition: 'left',
  fontSize: 14,
  width: '1',
  height: '1',
  borderStyle: 'soild',
  color: '#dcdfe6',
  fontColor: 'black',
  direction: 'horizontal',
})
</script>
