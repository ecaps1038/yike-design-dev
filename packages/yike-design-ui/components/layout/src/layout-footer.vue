<template>
  <footer :class="bem()" :style="{ height: toPx(height) }">
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { createCssScope, toPx } from '../../utils'
import type { LayoutFooterProps } from './layout'

defineOptions({ name: 'YkLayoutFooter' })

withDefaults(defineProps<LayoutFooterProps>(), {
  height: 64,
})

const bem = createCssScope('layout-footer')
</script>
