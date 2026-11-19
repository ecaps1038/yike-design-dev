<template>
  <yk-space dir="vertical" align="start">
    <yk-table
      style="width: 100%"
      :data="dataList"
      row-key="id"
      @sort-change="handleSortChange"
    >
      <yk-table-column type="index" label="#" width="64" />
      <yk-table-column property="name" label="姓名" sortable />
      <yk-table-column
        property="age"
        label="年龄"
        align="right"
        sortable
        :sort-method="(a, b) => a.age - b.age"
      />
      <yk-table-column property="score" label="分数" sortable width="120" />
    </yk-table>
    <span>当前排序：{{ sortText }}</span>
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataList = ref([
  { id: 1, name: '张三', age: 30, score: 88 },
  { id: 2, name: '李四', age: 20, score: 95 },
  { id: 3, name: '王五', age: 25, score: 76 },
])

const sortText = ref('未排序')
const handleSortChange = ({
  prop,
  order,
}: {
  prop?: string
  order: 'asc' | 'desc' | null
}) => {
  sortText.value = order ? `${prop} ${order}` : '未排序'
}
</script>
