<script setup lang="ts">
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
})


</script>
<template>
  <div class="yk-table">
    <table cellspacing="0">
      <tr>
        <th v-for="(e,index) in columns" :key="index">{{(e as any).title}}</th>
      </tr>
      <tr v-for="(n,i) in data" :key="i">
        <td v-for="(e,j) in columns" :key="j" :class="{light:(e as any).light}">{{ (n as any)[(e as any).dataIndex] }}</td>
      </tr>
    </table>
  </div>
</template>
<style scoped lang="less">
.yk-table {
  table {
    border: 1px solid @line-color-s;
    min-width: 800px;
    width: 100%;
    border-radius: @radius-m;
    overflow: hidden;
    margin-top: @space-s;
    transition: border @animats;

    tr {
      &:hover {
        background-color: @bg-color-m;
      }
    }

    th {
      line-height: 44px;
      background-color: @bg-color-m;
      font-size: @size-s;
      font-weight: 600;
      padding-left: @space-m;
      text-align: left;
      transition: background-color @animats;
    }

    td {
      border-top: 1px solid @line-color-s;
      padding: 10px @space-m;
      text-align: left;
      max-width: 240px;
      transition: border @animats;
    }
    .light{
      color:@scolor;
    }
  }
}</style>