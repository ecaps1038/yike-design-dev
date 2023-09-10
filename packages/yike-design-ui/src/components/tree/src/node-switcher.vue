<script setup lang="ts">
import { inject } from 'vue'
import { createCssScope } from '../../utils'
import { TreeInjectionKey, TreeNodeInjectionKey } from './tree'

const bem = createCssScope('tree-node-switcher')

const nodeContext = inject(TreeNodeInjectionKey)
const context = inject(TreeInjectionKey)
</script>

<template>
  <span
    :class="
      bem([
        nodeContext?.expanded.value ? 'rotate' : '',
        nodeContext?.isLeaf ? 'leaf' : '',
      ])
    "
    @click="
      context?.onExpand?.(nodeContext?.option.key!, nodeContext?.expanded.value)
    "
  >
    <component :is="(context?.expandIcon?.() as any)" />
  </span>
</template>
