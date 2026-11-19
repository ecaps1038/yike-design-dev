<template>
  <yk-table :data="dataList" row-key="id" stripe>
    <yk-table-column type="index" label="#" width="64" />
    <yk-table-column property="name" label="用户名" />
    <yk-table-column property="email" label="邮箱" />
    <yk-table-column property="bir" label="生日" width="140" />
    <yk-table-column property="desc" label="简介" ellipsis />
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
    desc: '这句话不知道 当讲不当讲，反正就是想讲一讲的',
  },
  {
    id: 2,
    name: 'Line2',
    email: 'line2@qq.com',
    bir: '1995.05.20',
    desc: '表格内容超出宽度时会显示省略号',
  },
  {
    id: 3,
    name: 'DF的编辑测试',
    email: 'df@qq.com',
    bir: '2052.1.1',
    desc: '支持 row-key 保持选中状态',
  },
])
</script>
