<script setup lang="ts">
import { TableProps } from './table'
defineOptions({
  name: 'YkTable',
})
const props = withDefaults(defineProps<TableProps>(), {
  columns: [] as any,
  data: [] as any,
})
</script>
<template>
  <div class="yk-table">
    <table cellspacing="0">
      <tr>
        <th v-for="(e, index) in props.columns" :key="index">
          {{ (e as any).title }}
        </th>
      </tr>
      <tr v-for="(n, i) in props.data" :key="i">
        <td
          v-for="(e, j) in props.columns"
          :key="j"
          :class="{ light: (e as any).light }"
        >
          {{ (n as any)[(e as any).dataIndex] }}
        </td>
      </tr>
    </table>
  </div>
</template>
