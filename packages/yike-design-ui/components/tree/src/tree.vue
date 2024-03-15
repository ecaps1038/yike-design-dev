<template>
  <div :class="bem()">
    <YkScrollbar v-if="props.scrollbar" v-bind="props.scrollbar">
      <Node v-for="option in options" :key="option.key" :option="option" />
    </YkScrollbar>
    <template v-else>
      <Node v-for="option in options" :key="option.key" :option="option" />
    </template>
  </div>
</template>

<script setup lang="ts">
import Node from './node.vue'
import { TreeInjectionKey, TreeProps } from './tree'
import { createCssScope, Key } from '../../utils'
import { getOffspringKeys } from './util'
import { tree2list } from './internal'
import {
  watch,
  ref,
  onMounted,
  provide,
  shallowRef,
  toRefs,
  h,
  reactive,
} from 'vue'
import { IconRightFill } from '../../svg-icon'
import { YkScrollbar } from '../../scrollbar'
import '../style'

defineOptions({
  name: 'YkTree',
})

const bem = createCssScope('tree')
const props = withDefaults(defineProps<TreeProps>(), {
  blockNode: false,
  multiple: false,
  expandIcon() {
    return h(IconRightFill)
  },
  defaultExpandedKeys() {
    return []
  },
  defaultSelectedKeys() {
    return []
  },
  fileTree: false,
  checkable: false,
  checkStrategy: 'all',
  checkStrictly: false,
  scrollbar: false,
})

const emits = defineEmits<{
  expand: [keys: Key[]]
  select: [keys: Key[]]
  check: [keys: Key[]]
}>()

const {
  checkStrictly,
  checkStrategy,
  checkable,
  fileIcons,
  fileTree,
  blockNode,
  expandIcon,
  unSelectKey,
} = toRefs(props)

// 获取节点的 map 结构
// eslint-disable-next-line vue/no-setup-props-destructure
const nodeMaps = shallowRef(tree2list(props.options))
watch(
  () => props.options,
  () => {
    nodeMaps.value = tree2list(props.options)
  },
)

// 处理节点的展开收缩逻辑
const expandedKeys = defineModel<Key[]>('expandedKeys', {
  local: true,
  default: [],
})
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

// 处理节点选中的逻辑
const selectedKeys = defineModel<Key[]>('selectedKeys', {
  local: true,
  default: [],
})
onMounted(() => {
  if (props.defaultSelectedKeys.length === 0) {
    return
  }
  selectedKeys.value = props.defaultSelectedKeys
  for (const key of props.defaultSelectedKeys) {
    const pKey = nodeMaps.value.get(key)?.pKey
    if (pKey) handleExpandPKey(pKey)
  }
})
const onSelect = (key: Key) => {
  if (props.multiple) {
    selectedKeys.value = [...new Set([...selectedKeys.value, key])]
  } else {
    selectedKeys.value = [key]
  }
  emits('select', selectedKeys.value)
}

watch(
  () => unSelectKey?.value,
  (newVal) => {
    selectedKeys.value = selectedKeys.value.filter((target) => target != newVal)
    if (checkable.value) {
      onChecked([newVal as Key], false)
    }
  },
)

// handle node check logic
const checkedKeys = defineModel<Key[]>('checkedKeys', {
  default: [],
  local: true,
})
const _checkedKeys = ref<Key[]>([])

_checkedKeys.value = [...checkedKeys.value]

watch(
  checkStrictly,
  (v) => {
    if (!v) {
      let keys: Key[] = []
      _checkedKeys.value.forEach((key) => {
        const node = nodeMaps.value.get(key)
        if (!node) {
          return
        }
        const childKey = getOffspringKeys(node)
        keys.push(key)
        childKey.forEach((ck) => {
          if (keys.includes(ck)) return
          keys.push(ck)
        })
      })
      _checkedKeys.value = [...new Set(keys)]
    } else {
      getOuterWantKeys()
    }
  },
  { immediate: true },
)

/** 根据 checkStrategy 获取外部需要的 keys */
const getOuterWantKeys = () => {
  // 父子节点关联取消的时候，失效
  if (checkStrategy.value === 'all' || checkStrictly.value) {
    checkedKeys.value = [..._checkedKeys.value]
    return
  }
  const allChildCheckedParentKey: Key[] = []
  _checkedKeys.value.forEach((key) => {
    if (!nodeMaps.value.has(key)) return
    const childKey = getOffspringKeys(nodeMaps.value.get(key)!)
    if (childKey && childKey.length > 0) {
      if (childKey.every((k) => _checkedKeys.value.includes(k))) {
        allChildCheckedParentKey.push(key)
        return
      }
    }
  })
  if (checkStrategy.value === 'parent') {
    checkedKeys.value = _checkedKeys.value.filter((key) => {
      const node = nodeMaps.value.get(key)
      if (node && node.pKey && allChildCheckedParentKey.includes(node.pKey)) {
        return false
      }
      return true
    })
  }
  if (checkStrategy.value === 'child') {
    checkedKeys.value = _checkedKeys.value.filter((key) => {
      return !allChildCheckedParentKey.includes(key)
    })
  }
}

watch(_checkedKeys, getOuterWantKeys, { deep: true, immediate: true })

watch(checkStrategy, getOuterWantKeys)
//此方法可以用于tree-select组件的取消选中，复选框的响应式逻辑
const onChecked = (keys: Key[], checked: boolean) => {
  if (checked) {
    _checkedKeys.value.push(...keys)
  } else {
    _checkedKeys.value = _checkedKeys.value.filter((k) => !keys.includes(k))
  }
}

provide(
  TreeInjectionKey,
  reactive({
    blockNode: blockNode,
    expandedKeys: expandedKeys,
    selectedKeys: selectedKeys,
    checkedKeys: _checkedKeys,
    fileTree: fileTree,
    fileIcons: fileIcons,
    checkable: checkable,
    checkStrategy: checkStrategy,
    checkStrictly: checkStrictly,
    expandIcon: expandIcon,
    nodeMaps,
    onSelect,
    onExpand,
    onChecked,
  }),
)
</script>
