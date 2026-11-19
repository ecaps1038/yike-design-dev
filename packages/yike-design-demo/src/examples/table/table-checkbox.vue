<template>
  <yk-table
    :data="dataList"
    row-key="id"
    @selection-change="handleSelectionChange"
  >
    <yk-table-column type="checkbox" width="64" />
    <yk-table-column property="name" label="用户名" />
    <yk-table-column property="email" label="邮箱" />
    <yk-table-column property="bir" label="生日" />
    <yk-table-column property="desc" label="简介" />
  </yk-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataList = ref([
  {
    id: 1,
    name: '浩哥看沟通',
    email: 'xigeotmete@qq.com',
    bir: '1994.03.12',
    desc: '简介一',
  },
  {
    id: 2,
    name: 'Line2',
    email: 'line2@qq.com',
    bir: '1995.05.20',
    desc: '简介二',
  },
  { id: 3, name: 'DF', email: 'df@qq.com', bir: '2052.1.1', desc: '简介三' },
])

const handleSelectionChange = (selection: unknown[]) => {
  return selection
}
</script>
