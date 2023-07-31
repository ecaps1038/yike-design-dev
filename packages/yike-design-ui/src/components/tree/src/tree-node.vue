<script setup lang="ts">
import { computed } from 'vue'
import { createCssScope } from '../../utils'
import { inject } from 'vue'
import { TreeInjectionKey, TreeNodeInjectionKey, TreeOption } from './tree'
import NodeSwitcher from './node-switcher.vue'
import { h } from 'vue'
import {
  IconFolderCloseOutline,
  IconFolderOpenOutline,
  IconFileOutline,
} from '../../svg-icon'

const bem = createCssScope('tree-node')

const props = defineProps<{
  label: string
  node: TreeOption
}>()

const cls = computed(() => {
  return bem()
})

const context = inject(TreeInjectionKey)
const nodeContext = inject(TreeNodeInjectionKey)

const selected = computed(() => {
  return !!context?.selectedKeys?.value.includes(props.node.key)
})

const contentCls = computed(() => {
  return bem('content', [
    context?.blockNode ? 'block' : undefined,
    selected.value ? 'active' : undefined,
  ])
})
const icons = Object.assign(
  {
    fold: () => h(IconFolderCloseOutline),
    unfold: () => h(IconFolderOpenOutline),
    file: () => h(IconFileOutline),
  },
  context?.fileIcons,
  props.node.icons,
)
const fileIcon = computed<any>(() => {
  if (!context?.fileTree) return null
  if (nodeContext?.isLeaf) return icons['file']
  if (nodeContext?.expanded.value) return icons['unfold']
  return icons['fold']
})
</script>

<template>
  <div :class="cls">
    <NodeSwitcher />
    <div :class="contentCls" @click="context?.onSelect?.(props.node.key)">
      <span v-if="context?.fileTree" :class="bem('file')">
        <component :is="fileIcon" />
      </span>
      <span>{{ label }}</span>
    </div>
  </div>
</template>
