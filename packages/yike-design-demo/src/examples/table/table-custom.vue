<template>
  <yk-table
    ref="tableRef"
    :data="dataList"
    row-key="id"
    @selection-change="handleSelectionChange"
  >
    <yk-table-column type="checkbox" width="64" />
    <yk-table-column property="name" label="用户名" />
    <yk-table-column property="email" label="邮箱" />
    <yk-table-column property="bir" label="生日" />
    <yk-table-column property="desc" label="操作" width="220">
      <template #default="{ row, index }">
        <yk-button type="secondary" status="primary" @click="handleAdd(row)">
          添加
        </yk-button>
        <yk-button
          type="outline"
          status="primary"
          style="margin-left: 8px"
          @click="handleDelete(index)"
        >
          删除
        </yk-button>
      </template>
    </yk-table-column>
  </yk-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const dataList = ref([
  { id: 1, name: '浩哥看沟通', email: 'xigeotmete@qq.com', bir: '1994.03.12' },
  { id: 2, name: 'Line2', email: '', bir: '1994.03.12' },
  { id: 3, name: 'DF的删除测试', email: 'xx', bir: '2052.1.1' },
  { id: 4, name: 'DF的编辑测试', email: 'nn', bir: '2052.1.1' },
])

const handleSelectionChange = (selection: unknown[]) => {
  return selection
}

const handleAdd = (row: unknown) => {
  return row
}

const handleDelete = (index: number) => {
  dataList.value.splice(index, 1)
}
</script>
