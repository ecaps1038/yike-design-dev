<template>
  <div :class="bem([], { stripe, border })" :style="wrapperStyle">
    <div v-if="loading" :class="bem('loading')" role="status">
      <yk-spinner :size="20" />
      <span>{{ loadingText }}</span>
    </div>
    <table>
      <TableHeader />
      <TableBody v-if="!isEmpty" />
      <tbody v-if="isEmpty && !loading" :class="bem('empty-body')">
        <tr>
          <td :class="bem('empty')" :colspan="columnCount">
            <slot name="empty">{{ emptyText }}</slot>
          </td>
        </tr>
      </tbody>
      <slot name="tbody" />
    </table>
    <div v-show="false" ref="hiddenColumns">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide, watch } from 'vue'
import { createCssScope, toPx } from '../../utils'
import type { SortOrder } from './store'
import {
  Table,
  TABLE_INJECTION_KEY,
  TableColumn,
  TableProps,
  genTableId,
} from './table'
import { useStore } from './store'
import TableHeader from './header'
import TableBody from './body'
import YkSpinner from '../../spinner'

defineOptions({
  name: 'YkTable',
})

const props = withDefaults(defineProps<TableProps>(), {
  data: () => [],
  height: undefined,
  maxHeight: undefined,
  loading: false,
  loadingText: '加载中',
  emptyText: '暂无数据',
  rowKey: undefined,
  stripe: false,
  border: false,
})

defineEmits<{
  (e: 'select', selection: unknown[], row: unknown): void
  (e: 'select-all', selection: unknown[]): void
  (e: 'selection-change', selection: unknown[]): void
  (
    e: 'sort-change',
    payload: {
      column: TableColumn<unknown>
      prop?: string
      order: SortOrder
    },
  ): void
}>()

type Row = (typeof props.data)[number]
const bem = createCssScope('table')
const table = getCurrentInstance() as Table<Row>
table.bem = bem
const store = useStore<Row>()
store.state.data.value = props.data
table.store = store
table.tableId = genTableId()

const isEmpty = computed(() => (store.state.data.value || []).length === 0)
const columnCount = computed(() =>
  Math.max(store.state.columns.value.length, 1),
)
const wrapperStyle = computed(() => ({
  height: toPx(props.height),
  maxHeight: toPx(props.maxHeight),
}))

watch(
  () => props.data,
  (data) => {
    store.state.data.value = data || []
  },
  { deep: true },
)

watch(
  () => props.rowKey,
  (key) => store.dispatch('setRowKey', key),
  { immediate: true },
)

provide(TABLE_INJECTION_KEY, table)

defineExpose({
  clearSelection: () => store.dispatch('clearSelection'),
  getSelectionRows: () => store.state.selection.value.slice(),
  toggleRowSelection: (row: Row, selected: boolean) =>
    store.dispatch('toggleRowSelection', row, selected),
  toggleAllSelection: (selected: boolean) =>
    store.dispatch('toggleAllSelection', selected),
  sort: (column: TableColumn<Row>) => store.dispatch('toggleSort', column),
})
</script>
