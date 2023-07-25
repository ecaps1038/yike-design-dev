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
<!-- <style scoped lang="less">
.yk-table {
  table {
    overflow: hidden;
    margin-top: @space-s;
    width: 100%;
    min-width: 800px;
    border: 1px solid @line-color-s;
    border-radius: @radius-m;
    transition: border @animats;

    tr:hover {
      background-color: @bg-color-m;
    }

    th {
      padding-left: @space-m;
      font-size: @size-s;
      font-weight: 600;
      text-align: left;
      background-color: @bg-color-m;
      transition: background-color @animats;
      line-height: 44px;
    }

    td {
      padding: 10px @space-m;
      max-width: 240px;
      border-top: 1px solid @line-color-s;
      text-align: left;
      transition: border @animats;
    }

    .light {
      color: @scolor;
    }
  }
}
</style> -->
