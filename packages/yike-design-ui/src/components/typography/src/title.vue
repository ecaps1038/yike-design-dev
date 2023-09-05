<template>
  <component :is="wrapTitle" :class="titleClass">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'
import { titleProps } from './typography'

defineOptions({
  name: 'YkTitle',
})

const props = withDefaults(defineProps<titleProps>(), {
  level: 1,
  type: 'default',
})

const slots = useSlots()

const titleClass = computed(() => {
  return {
    [`yk-title--${props.type}`]: props.type,
    'yk-title': true,
    'yk-typography': true,
  }
})

const wrapTitle = computed(() => {
  return slots && slots.length ? 'div' : `h${props.level}`
})
</script>
