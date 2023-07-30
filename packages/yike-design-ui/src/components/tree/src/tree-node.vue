<script setup lang="ts">
import { computed } from 'vue'
import { createCssScope } from '../../utils'
import { inject } from 'vue'
import { TreeInjectionKey, TreeOption } from './tree'
import NodeSwitcher from './node-switcher.vue'

const bem = createCssScope('tree-node')

const props = defineProps<{
  label: string
  node: TreeOption
}>()

const cls = computed(() => {
  return bem()
})

const context = inject(TreeInjectionKey)

const selected = computed(() => {
  return !!context?.selectedKeys?.value.includes(props.node.key)
})

const contentCls = computed(() => {
  return bem('content', [
    context?.blockNode ? 'block' : undefined,
    selected.value ? 'active' : undefined,
  ])
})
</script>

<template>
  <div :class="cls">
    <NodeSwitcher />
    <div :class="contentCls" @click="context?.onSelect?.(props.node.key)">
      <span>{{ label }}</span>
    </div>
  </div>
</template>
