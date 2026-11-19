<template>
  <yk-space dir="vertical" align="start">
    <yk-space>
      <span>加载中：</span>
      <yk-switch v-model="loading" />
      <span>斑马纹：</span>
      <yk-switch v-model="stripe" />
      <span>边框：</span>
      <yk-switch v-model="border" />
      <span>空数据：</span>
      <yk-switch v-model="empty" />
    </yk-space>
    <yk-table
      style="width: 100%"
      :data="empty ? [] : dataList"
      :loading="loading"
      :stripe="stripe"
      :border="border"
      row-key="id"
      empty-text="暂无数据，试试切换“空数据”开关"
    >
      <yk-table-column property="name" label="用户名" />
      <yk-table-column property="email" label="邮箱" />
      <yk-table-column property="bir" label="生日" />
    </yk-table>
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const stripe = ref(true)
const border = ref(true)
const empty = ref(false)

const dataList = ref([
  { id: 1, name: '浩哥看沟通', email: 'xigeotmete@qq.com', bir: '1994.03.12' },
  { id: 2, name: 'Line2', email: 'line2@qq.com', bir: '1995.05.20' },
  { id: 3, name: 'DF', email: 'df@qq.com', bir: '2052.1.1' },
])
</script>
