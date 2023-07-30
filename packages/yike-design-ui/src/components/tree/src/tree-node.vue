<script setup lang="ts">
import { computed } from 'vue'
import { createCssScope } from '../../utils'
import { inject } from 'vue'
import { TreeInjectionKey } from './tree'
import NodeSwitcher from './node-switcher.vue'

const bem = createCssScope('tree-node')

const props = defineProps<{
  label: string
}>()

const cls = computed(() => {
  return bem()
})

const context = inject(TreeInjectionKey)
const contentCls = computed(() => {
  return bem('content', [context?.blockNode ? 'block' : undefined])
})
</script>

<template>
  <div :class="cls">
    <NodeSwitcher />
    <div :class="contentCls">
      <span>{{ label }}</span>
    </div>
  </div>
</template>
