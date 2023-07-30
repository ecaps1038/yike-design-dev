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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 32 32"
    >
      <path d="M12 8l10 8l-10 8z"></path>
    </svg>
  </span>
</template>
