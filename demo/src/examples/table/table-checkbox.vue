<template>
  <yk-table :data="dataList" @selection-change="handleSelectionChange">
    <yk-table-column type="checkbox"></yk-table-column>
    <yk-table-column property="name" label="用户名"></yk-table-column>
    <yk-table-column property="email" label="邮箱"></yk-table-column>
    <yk-table-column property="bir" label="生日"></yk-table-column>
    <yk-table-column property="desc" label="简介"></yk-table-column>
  </yk-table>
</template>
<script setup lang="ts">
const dataList = []
for (let index = 0; index < 5; index++) {
  dataList.push({
    name: '浩哥看沟通',
    email: 'xigeotmete@qq.com',
    bir: '1994.03.12',
    desc: '这句话不知道 当讲不当讲，反正就是想讲一讲的',
  })
}
const handleSelectionChange = (val) => {
  console.log(val)
}
</script>
