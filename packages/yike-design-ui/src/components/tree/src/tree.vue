<template>
  <div :class="bem()">
    <Node v-for="option in options" :key="option.key" :option="option" />
    {{ expandedKeys }}
  </div>
</template>
<script setup lang="ts">
import { TreeInjectionKey, TreeOption, TreeProps } from './tree'
import { createCssScope } from '../../utils/bem'
import Node from './node.vue'
import { provide } from 'vue'
import { Key } from '../../utils'
import { shallowRef } from 'vue'
import { _TreeNode, tree2list } from './internal'
import { watch } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

const bem = createCssScope('tree')

defineOptions({
  name: 'YkTree',
})

const props = withDefaults(defineProps<TreeProps>(), {
  blockNode: false,
  defaultExpandedKeys() {
    return []
  },
})

const emits = defineEmits<{
  expand: [key: Key[]]
}>()

const nodeMaps = shallowRef(tree2list(props.options))

watch(
  () => props.options,
  () => {
    nodeMaps.value = tree2list(props.options)
  },
)

const expandedKeys = defineModel<Key[]>({ local: true, default: [] })

const handleExpandPKey = (key: Key) => {
  onExpand(key, false, true)
  const pKey = nodeMaps.value.get(key)?.pKey
  if (!pKey) return
  handleExpandPKey(pKey)
}

onMounted(() => {
  if (props.defaultExpandedKeys.length === 0) {
    return
  }
  for (const key of props.defaultExpandedKeys) {
    handleExpandPKey(key)
  }
})

const onExpand = (key: Key, close = false, first = false) => {
  console.log('onExpand: ', key, close)
  const s = new Set([...expandedKeys.value])
  if (close) {
    s.delete(key)
  } else {
    s.add(key)
  }
  expandedKeys.value = [...s]
  if (first) return
  emits('expand', expandedKeys.value)
}

provide(TreeInjectionKey, {
  blockNode: props.blockNode,
  expandedKey: expandedKeys,
  onExpand,
})
</script>
