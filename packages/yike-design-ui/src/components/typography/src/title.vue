<template>
  <component :is="`h${level}`" :class="['yk-title', props.type]">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { titleProps } from './typography'

defineOptions({
  name: 'YkTitle',
})

// prettier-ignore
const props = withDefaults(
  defineProps<titleProps>(), {
    level: 1,
  }
)
</script>
