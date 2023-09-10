<script setup lang="ts">
import { computed, inject, h } from 'vue'
import { createCssScope } from '../../utils'
import { TreeInjectionKey, TreeNodeInjectionKey, TreeOption } from './tree'
import NodeSwitcher from './node-switcher.vue'
import {
  IconFolderCloseOutline,
  IconFolderOpenOutline,
  IconFileOutline,
} from '../../svg-icon'
import { YkCheckbox } from '../../checkbox'
import { getOffspringKeys } from './util'

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
  return !!context?.selectedKeys?.includes(props.node.key)
})

const contentCls = computed(() => {
  return bem('content', [
    context?.blockNode ? 'block' : undefined,
    selected.value ? 'active' : undefined,
  ])
})
// eslint-disable-next-line vue/no-setup-props-destructure
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

const handleChange = (_checked: boolean) => {
  let keys = [props.node.key]
  if (!context?.checkStrictly) {
    // 判断当前节点的父节点的所有子节点是否都被选上了
    const curNode = context?.nodeMaps?.get(props.node.key)
    if (curNode && curNode.pKey) {
      const pNode = context?.nodeMaps?.get(curNode.pKey)

      if (
        pNode &&
        pNode.children?.every((child) =>
          context?.checkedKeys?.concat([props.node.key])?.includes(child.key),
        )
      ) {
        keys.push(pNode.key)
      }
    }
    keys.push(...getOffspringKeys(props.node))
  }
  context?.onChecked?.(keys, _checked)
}

const indeterminate = computed(() => {
  if (context?.checkStrictly) return false
  return (
    props.node.children?.some((child) =>
      context?.checkedKeys?.includes(child.key),
    ) &&
    !props.node.children?.every((child) =>
      context?.checkedKeys?.includes(child.key),
    )
  )
})

const checked = computed(() => {
  if (context?.checkStrictly) {
    return context?.checkedKeys?.includes(props.node.key)
  }
  return (
    context?.checkedKeys?.includes(props.node.key) ||
    props.node.children?.every((child) =>
      context?.checkedKeys?.includes(child.key),
    )
  )
})
</script>

<template>
  <div :class="cls">
    <NodeSwitcher />
    <!-- checkbox -->
    <span v-if="context?.checkable" :class="bem('checkbox')" @click.stop>
      <YkCheckbox
        :checked="checked"
        :indeterminate="indeterminate"
        @change="handleChange"
      />
    </span>
    <div :class="contentCls" @click="context?.onSelect?.(props.node.key)">
      <!-- custom switcher renderer -->
      <span v-if="context?.fileTree" :class="bem('file')">
        <component :is="fileIcon" />
      </span>
      <span>{{ label }}</span>
    </div>
  </div>
</template>
