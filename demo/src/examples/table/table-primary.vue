<template>
  <yk-table :data="dataList">
    <yk-table-column property="name" label="Name">
      <yk-button>点击</yk-button>
    </yk-table-column>
    <yk-table-column property="age" label="Age"></yk-table-column>
  </yk-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const dataList = [
  {
    name: 'zhangsan',
    age: 18,
  },
  {
    name: 'lisi',
    age: 26,
  },
]
const flag = ref(false)
setTimeout(() => {
  flag.value = true
  setTimeout(() => {
    flag.value = false
  }, 2000)
}, 2000)
</script>
