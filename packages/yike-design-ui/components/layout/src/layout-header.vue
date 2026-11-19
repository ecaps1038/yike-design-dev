<template>
  <header :class="bem()" :style="{ height: toPx(height) }">
    <slot />
  </header>
</template>

<script setup lang="ts">
import { createCssScope, toPx } from '../../utils'
import type { LayoutHeaderProps } from './layout'

defineOptions({ name: 'YkLayoutHeader' })

withDefaults(defineProps<LayoutHeaderProps>(), {
  height: 64,
})

const bem = createCssScope('layout-header')
</script>
