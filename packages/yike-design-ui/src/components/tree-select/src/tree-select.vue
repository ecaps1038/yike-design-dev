<template>
  <div ref="container" class="yk-tree-select__main-container">
    <div ref="inputView">
      <SelectView
        :current-items="currentItems"
        :is-focus="isTreeViewVisible"
        :default-value="props.defaultValue"
        :placeholder="props.placeholder"
        :allow-clear="props.allowClear"
        :size="props.size"
        :multiple="props.multiple"
        :bordered="props.bordered"
        :disabled="props.disabled"
        :tree-options="options"
        @send-focus="sendFocus"
        @send-un-select-key="sendUnSelectKey"
        @send-select-key="sendSelectKey"
        @send-clear-key="sendClearKey"
      ></SelectView>
    </div>
    <transition
      :duration="{ enter: 300, leave: 300 }"
      mode="out-in"
      name="fade"
    >
      <div
        v-show="isTreeViewVisible"
        ref="treeView"
        class="yk-tree-select__container-box"
      >
        <yk-tree
          v-model:selectedKeys="checkedKeys"
          :options="props.options"
          :multiple="props.multiple"
          :default-expanded-keys="props.defaultExpandedKeys"
          :checkable="props.checkable"
          :check-strictly="props.checkStrictly"
          :file-tree="props.fileTree"
          :file-icons="props.fileIcons"
          :un-select-key="refUnSelectKey"
          :select-key="refSelectKey"
          @select="select"
        ></yk-tree>
        <yk-empty v-if="!props.options.length" :description="props.emptyText" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import SelectView from './select-view.vue'
import { ref, Ref, onMounted, watch } from 'vue'
import YkEmpty from '../../empty'
import { Key } from '../../utils'
import { YkTree, TreeOption } from '../../tree'
import type { TreeSelectPropsType } from './tree-select'

defineOptions({
  name: 'YkTreeSelect',
})

const props = withDefaults(defineProps<TreeSelectPropsType>(), {
  id: '',
  options: () => [],
  allowClear: true,
  bordered: true,
  defaultValue: '',
  disabled: false,
  placeholder: '',
  size: 2,
  lazy: false,
  emptyText: '',
  checkable: false,
  deployment: false,
  multiple: false,
  checkStrictly: false,
  defaultExpandedKeys: () => [],
})

const container = ref<HTMLElement | null>(null)
const inputView = ref<HTMLElement | null>(null)
const treeView = ref<HTMLElement | null>(null)
const isTreeViewVisible = ref(false)

const currentItems = ref<TreeOption[]>([])

const sendFocus = (focusShadow: Ref<boolean>) => {
  if (focusShadow.value) {
    isTreeViewVisible.value = focusShadow.value
  }
}
// 用作checkbox
const refUnSelectKey = ref<Key>('')
const refSelectKey = ref<Key>('')

// 改变selectKeys
const checkedKeys = ref<Key[]>([])
const sendClearKey = () => {
  checkedKeys.value = []
}
const sendUnSelectKey = (unSelectKey: Ref<Key>) => {
  refUnSelectKey.value = unSelectKey.value
}
const sendSelectKey = (selectKey: Ref<Key>) => {
  refSelectKey.value = selectKey.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    container.value &&
    !container.value.contains(event.target as Node) &&
    !inputView.value?.contains(event.target as Node)
  ) {
    isTreeViewVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (container.value) {
    container.value.style.width = props.size * 200 + 'px'
  }
})

const select = (keys: Key[]) => {
  const list = findByKeys(props.options, keys)
  currentItems.value = list ? list : []
}

watch(checkedKeys, (newVal) => {
  const list = findByKeys(props.options, newVal)
  currentItems.value = list ? list : []
})

const findByKeys = (options: TreeOption[], keys: Key[]): TreeOption[] => {
  const list: TreeOption[] = []
  const findItem = (items: TreeOption[]) => {
    for (const item of items) {
      if (keys.includes(item.key)) {
        list.push(item)
      }
      if (item.children) {
        findItem(item.children)
      }
    }
  }
  findItem(options)
  return list
}
</script>
