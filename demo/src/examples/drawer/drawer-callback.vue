<template>
  <yk-space>
    <yk-button @click="active = true">打开抽屉</yk-button>
  </yk-space>
  <yk-drawer
    title="你好，世界。"
    :show="active"
    @close="onClose"
    @open="onOpen"
  >
    你看到了什么？
  </yk-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const active = ref(false)
const onClose = () => {
  proxy.$message({ type: 'success', message: '正在请求...' })
  async function fakeFetch() {
    await fetch(
      'https://fakerapi.it/api/v1/persons?_quantity=1&_gender=male&_birthday_start=2005-01-01',
    )
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        active.value = false
        proxy.$message({ type: 'success', message: '抽屉已关闭。' })
      })
  }
  fakeFetch()
}
const onOpen = () => {
  proxy.$message({ type: 'success', message: '抽屉已打开。' })
}
</script>
