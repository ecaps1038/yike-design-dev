<script setup lang="ts">
import { TreeInjectionKey, TreeNodeInjectionKey, TreeOption } from './tree'
import TreeNode from './tree-node.vue'
import { computed, inject, provide } from 'vue'
import ExpandTransition from './expand-transition.vue'

const props = defineProps<{
  option: TreeOption
}>()

const context = inject(TreeInjectionKey)
const expanded = computed(() => {
  return !!context?.expandedKeys?.includes(props.option.key)
})
const canOpen = computed(() => expanded.value && !isLeaf.value)
const isLeaf = computed(
  () => !props.option.children || !props.option.children.length,
)

// eslint-disable-next-line vue/no-setup-props-destructure
provide(TreeNodeInjectionKey, {
  option: props.option,
  isLeaf: isLeaf.value,
  expanded: expanded,
})
</script>

<template>
  <TreeNode :label="option.label" :node="option" />
  <ExpandTransition>
    <div v-if="canOpen" class="yk-tree__list">
      <node v-for="item in option.children" :key="item.key" :option="item" />
    </div>
  </ExpandTransition>
</template>
