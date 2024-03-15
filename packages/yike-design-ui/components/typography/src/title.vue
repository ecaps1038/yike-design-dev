<template>
  <component :is="`h${level}`" :class="bem([type])">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { titleProps } from './typography'
import { createCssScope } from '../../utils'

defineOptions({ name: 'YkTitle' })

const bem = createCssScope('title')

// prettier-ignore
const props = withDefaults(
  defineProps<titleProps>(), {
    level: 1,
  }
)
</script>
