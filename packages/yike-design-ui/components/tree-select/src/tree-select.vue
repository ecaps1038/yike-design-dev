<template>
  <div
    ref="containerRef"
    :class="bem()"
    :style="containerStyle"
    @keydown.esc="handleEscape"
  >
    <SelectView
      :class="bem('selector')"
      :current-items="currentItems"
      :multiple="multiple"
      :display-text="displayText"
      :placeholder="placeholder"
      :allow-clear="allowClear"
      :bordered="bordered"
      :disabled="mergedDisabled"
      :focused="isOpen"
      @toggle="toggleDropdown"
      @clear="handleClear"
      @remove="handleRemove"
      @close="closeDropdown(true)"
    />

    <transition name="yk-tree-select-fade">
      <div
        v-if="isOpen"
        :class="bem('dropdown')"
        role="listbox"
        :aria-multiselectable="multiple || checkable"
      >
        <yk-tree
          v-if="options.length"
          v-model:selected-keys="treeSelectedKeys"
          v-model:checked-keys="treeCheckedKeys"
          :options="options"
          :multiple="multiple"
          :checkable="checkable"
          :check-strictly="checkStrictly"
          :check-strategy="checkStrategy"
          :default-expanded-keys="defaultExpandedKeys"
          :file-tree="fileTree"
          :file-icons="fileIcons"
          :scrollbar="scrollbar"
          @select="handleTreeSelect"
        />
        <yk-empty v-else :description="emptyText" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRef } from 'vue'
import { createCssScope, toPx, useFormItem } from '../../utils'
import type { Key } from '../../utils'
import type { TreeOption } from '../../tree/src/tree'
import { YkTree } from '../../tree'
import YkEmpty from '../../empty'
import SelectView from './select-view.vue'
import type { TreeSelectProps } from './tree-select'

defineOptions({ name: 'YkTreeSelect' })

const props = withDefaults(defineProps<TreeSelectProps>(), {
  modelValue: undefined,
  defaultValue: '',
  options: () => [],
  allowClear: true,
  bordered: true,
  disabled: false,
  placeholder: '请选择',
  size: 2,
  width: undefined,
  emptyText: '暂无数据',
  multiple: false,
  checkable: false,
  checkStrictly: false,
  checkStrategy: 'all',
  defaultExpandedKeys: () => [],
  fileTree: false,
  fileIcons: undefined,
  scrollbar: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Key | Key[] | undefined): void
  (e: 'change', value: Key | Key[] | undefined): void
  (e: 'visible-change', visible: boolean): void
  (e: 'clear'): void
  (e: 'remove-tag', key: Key): void
  (e: 'focus'): void
}>()

const bem = createCssScope('tree-select')

const { mergedDisabled, validate } = useFormItem({
  disabled: toRef(props, 'disabled'),
})

const containerRef = ref<HTMLElement>()
const isOpen = ref(false)

const currentValue = computed(() =>
  props.modelValue !== undefined ? props.modelValue : props.defaultValue,
)

const selectedKeys = computed<Key[]>(() => {
  const value = currentValue.value
  if (Array.isArray(value)) return value
  return value === '' || value === undefined || value === null ? [] : [value]
})

const currentItems = computed(() =>
  findNodesByKeys(props.options, selectedKeys.value),
)

const displayText = computed(() => currentItems.value[0]?.label ?? '')

// Tree 内部通过 defineModel 写回选中值，这里用可写计算属性桥接成 v-model
const treeSelectedKeys = computed<Key[]>({
  get: () => selectedKeys.value,
  set: (keys) => {
    if (!props.checkable) emitValue(keys)
  },
})

const treeCheckedKeys = computed<Key[]>({
  get: () => selectedKeys.value,
  set: (keys) => {
    if (props.checkable) emitValue(keys)
  },
})

const containerStyle = computed(() => {
  if (props.width !== undefined) {
    return { width: toPx(props.width) }
  }
  return { width: `${(props.size ?? 2) * 200}px` }
})

function findNodesByKeys(options: TreeOption[], keys: Key[]): TreeOption[] {
  const list: TreeOption[] = []
  const find = (items: TreeOption[]) => {
    for (const item of items) {
      if (keys.includes(item.key)) list.push(item)
      if (item.children) find(item.children)
    }
  }
  find(options)
  return list
}

function emitValue(keys: Key[]) {
  let value: Key | Key[] | undefined
  if (props.checkable || props.multiple) {
    value = keys
  } else {
    value = keys[0]
  }
  validate('change')
  emit('update:modelValue', value)
  emit('change', value)
}

function openDropdown() {
  if (mergedDisabled.value || isOpen.value) return
  isOpen.value = true
  emit('visible-change', true)
  emit('focus')
  document.addEventListener('keydown', handleDocumentKeydown)
}

function closeDropdown(restoreFocus = false) {
  if (!isOpen.value) return
  isOpen.value = false
  emit('visible-change', false)
  document.removeEventListener('keydown', handleDocumentKeydown)
  if (restoreFocus) {
    containerRef.value
      ?.querySelector<HTMLElement>('.yk-select-view__trigger')
      ?.focus()
  }
}

function toggleDropdown() {
  if (mergedDisabled.value) return
  if (isOpen.value) closeDropdown()
  else openDropdown()
}

function handleTreeSelect() {
  if (props.checkable) return
  if (!props.multiple) closeDropdown()
}

function handleClear() {
  emitValue([])
  emit('clear')
  closeDropdown()
}

function handleRemove(key: Key) {
  emitValue(selectedKeys.value.filter((item) => item !== key))
  emit('remove-tag', key)
}

function handleEscape() {
  closeDropdown(true)
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeDropdown(true)
  }
}

function handleDocumentMouseDown(event: MouseEvent) {
  if (!isOpen.value) return
  if (containerRef.value?.contains(event.target as Node)) return
  closeDropdown()
}

onMounted(() => {
  document.addEventListener('mousedown', handleDocumentMouseDown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleDocumentMouseDown, true)
  document.removeEventListener('keydown', handleDocumentKeydown)
})

defineExpose({
  open: openDropdown,
  close: () => closeDropdown(),
  focus: () =>
    containerRef.value
      ?.querySelector<HTMLElement>('.yk-select-view__trigger')
      ?.focus(),
})
</script>
