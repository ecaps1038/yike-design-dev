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
        :bordered="props.bordered"
        :disabled="props.disabled"
        @send-focus="sendFocus"
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
          v-model:checkedKeys="checkedKeys"
          :options="props.options"
          :multiple="props.multiple"
          :default-expanded-keys="props.defaultExpandedKeys"
          :checkable="props.checkable"
          :check-strictly="props.checkStrictly"
          @select="select"
        ></yk-tree>
        <yk-empty v-if="!props.options.length" :description="props.emptyText" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import '../style/index'
import { ref, Ref, onMounted, watch } from 'vue'
import SelectView from './select-view.vue'
import YkEmpty from '../../empty/index'
import { TreeSelectPropsType } from './tree-select'
import YkTree from '../../tree'
import { Key } from '../../utils'
import { TreeOption } from '../../tree/src/tree'
// import { TreeDataType } from './tree-select'
// 将treeview变为异步组件加载
// const AsyncTree = defineAsyncComponent(() => import('../../tree'))

const props = withDefaults(defineProps<TreeSelectPropsType>(), {
  id: '',
  options: () => [],
  allowClear: true,
  bordered: true,
  defaultValue: '',
  disabled: false,
  placeholder: '',
  size: 1,
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
})

const select = (keys: Key[]) => {
  const list = findByKeys(props.options, keys)
  currentItems.value = list ? list : []
}
const checkedKeys = ref([])

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
