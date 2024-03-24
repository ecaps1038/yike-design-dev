<template>
  <yk-table
    ref="tableRef"
    :data="dataList"
    @selection-change="handleSelectionChange"
  >
    <yk-table-column type="selection"></yk-table-column>
    <yk-table-column property="name" label="用户名"></yk-table-column>
    <yk-table-column property="email" label="邮箱"></yk-table-column>
    <yk-table-column property="bir" label="生日"></yk-table-column>
    <yk-table-column property="desc" label="操作">
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
import { reactive , ref } from 'vue'

const tableRef = ref(null)
const dataList = reactive([
  {
    name: '浩哥看沟通',
    email: 'xigeotmete@qq.com',
    bir: '1994.03.12',
  },
  {
    name: 'Line2',
    email: '',
    bir: '1994.03.12',
  },

  {
    name: 'DF的删除测试',
    email: 'xx',
    bir: '2052.1.1',
    // desc: '这句话不知道 当讲不当讲，反正就是想讲一讲的',
  },
  {
    name: 'DF的编辑测试',
    email: 'nn',
    bir: '2052.1.1',
    // desc: '这句话不知道 当讲不当讲，反正就是想讲一讲的',
  },
  {
    name: 'DFIndex测试',
    email: 'tt',
    bir: '2052.1.1',
    // desc: '这句话不知道 当讲不当讲，反正就是想讲一讲的',
  },
])

const handleSelectionChange = (val) => {
  console.log(val)
}
const handleAdd = (e) => {
  console.log('🚀 Add ~ e:', e)
}
const handleDelete = (index) => {
  console.log('🚀 Delete ~ e:', index)
  dataList.splice(index, 1)
  console.log('🚀 ~ handleDelete ~ dataList:', dataList)
}
</script>
