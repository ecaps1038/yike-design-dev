<template>
  <section :class="bem([resolvedDirection])">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { createCssScope } from '../../utils'
import type { LayoutProps } from './layout'
import { layoutContextKey } from './layout'

defineOptions({ name: 'YkLayout' })

const props = withDefaults(defineProps<LayoutProps>(), {
  direction: undefined,
})

const bem = createCssScope('layout')
const siderCount = ref(0)

const resolvedDirection = computed(
  () => props.direction ?? (siderCount.value > 0 ? 'horizontal' : 'vertical'),
)

provide(layoutContextKey, {
  siderCount,
  registerSider: () => {
    siderCount.value += 1
  },
  unregisterSider: () => {
    siderCount.value = Math.max(0, siderCount.value - 1)
  },
})
</script>
