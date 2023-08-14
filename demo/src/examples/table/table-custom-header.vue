<template>
  <yk-table :data="dataList">
    <yk-table-column property="name" label="用户名"></yk-table-column>
    <yk-table-column property="email" label="邮箱"></yk-table-column>
    <yk-table-column property="bir" label="生日"></yk-table-column>
    <yk-table-column property="desc" label="操作">
      <template #header="scope">
        <yk-input
          v-model="search"
          placeholder="Type to search"
          @input="handleInput(scope)"
        />
      </template>
    </yk-table-column>
  </yk-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const search = ''
const dataList = ref([])
for (let index = 0; index < 5; index++) {
  dataList.value.push({
    name: '浩哥看沟通',
    email: 'xigeotmete@qq.com',
    bir: '1994.03.12',
    desc: '这句话不知道 当讲不当讲，反正就是想讲一讲的',
  })
}
const handleInput = ({ column, index }) => {
  console.log(column)
}
</script>
