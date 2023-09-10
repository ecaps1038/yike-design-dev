<template>
  <div :class="bem()">
    <table>
      <TableHeader />
      <TableBody />
    </table>
    <div v-show="false" ref="hiddenColumns">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defaultTableProps, Table, TABLE_INJECTION_KEY } from './table'
import { createCssScope } from '../../utils'
import { defineComponent, computed, getCurrentInstance, provide } from 'vue'
import { useStore } from './store'
import TableHeader from './header'
import TableBody from './body'

let tableIdSeed = 1

export default defineComponent({
  name: 'YkTable',
  components: { TableHeader, TableBody },
  props: defaultTableProps,
  emits: ['select', 'selection-change', 'select-all'],
  setup(props) {
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
    return {
      bem,
      tableId,
      store,
      isEmpty,
    }
  },
})
</script>
