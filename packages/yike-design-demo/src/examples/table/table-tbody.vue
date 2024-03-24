<template>
  <yk-table>
    <yk-table-column property="name" label="用户名"></yk-table-column>
    <yk-table-column property="email" label="邮箱"></yk-table-column>
    <yk-table-column property="bir" label="生日"></yk-table-column>
    <yk-table-column property="desc" label="简介"></yk-table-column>
    <yk-table-column
      property="manage"
      label="操作"
      align="right"
    ></yk-table-column>
    <template #tbody>
      <tr v-for="(item, index) in dataList" :key="index" class="yk-table__row">
        <td class="yk-table__cell">
          <yk-input v-model="item.name" />
        </td>
        <td class="yk-table__cell">
          {{ item.email }}
        </td>
        <td class="yk-table__cell">
          {{ item.bir }}
        </td>
        <td class="yk-table__cell">
          {{ item.desc }}
        </td>
        <td class="yk-table__cell text-right">
          <yk-text type="primary" style="cursor: pointer">删除</yk-text>
        </td>
      </tr>
    </template>
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
</script>
