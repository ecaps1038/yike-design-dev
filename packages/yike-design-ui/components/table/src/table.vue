<template>
  <div :class="bem()">
    <table>
      <TableHeader />
      <TableBody v-if="!isEmpty" />
      <slot name="tbody" />
    </table>
    <div v-show="false" ref="hiddenColumns">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Table, TABLE_INJECTION_KEY, TableProps } from './table'
import { createCssScope } from '../../utils'
import { computed, getCurrentInstance, provide } from 'vue'
import { useStore } from './store'
import TableHeader from './header'
import TableBody from './body'

let tableIdSeed = 1
defineOptions({
  name: 'YkTable',
})

const props = withDefaults(defineProps<TableProps>(), {
  height: 56,
})
type Row = (typeof props.data)[number]
const bem = createCssScope('table')
const table = getCurrentInstance() as Table<Row>
table.bem = bem
const store = useStore<Row>()
store.state.data.value = props.data!
table.store = store
const tableId = `yk-table_${tableIdSeed++}`
table.tableId = tableId
const isEmpty = computed(() => (store.state.data.value || []).length === 0)
provide(TABLE_INJECTION_KEY, table)
</script>
