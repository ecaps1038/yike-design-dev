<template>
  <span class="yk-typography yk-text">
    <span :class="textClass">
      <slot></slot>
    </span>
  </span>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { textProps } from './typography'
import '../style'

const props = withDefaults(defineProps<textProps>(), {
  b: false,
  type: 'default',
  mark: false,
  underline: false,
  del: false,
})

const { b, type, mark, underline, del } = toRefs(props)

const textClass = computed(() => {
  return [
    type.value,
    {
      strong: b.value,
      mark: mark.value,
      underline: underline.value,
      delete: del.value,
    },
  ]
})
</script>
