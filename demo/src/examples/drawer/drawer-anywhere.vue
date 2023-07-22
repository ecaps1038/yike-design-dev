<template>
  <yk-button @click="active = true">打开抽屉</yk-button>
  <div id="drawer-hub"></div>
  <yk-drawer
    title="你好，世界。"
    :show="active"
    to="#drawer-hub"
    @close="active = false"
  >
    你看到了什么？
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
  </yk-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(false)
</script>
<style scoped>
#drawer-hub {
  width: 100%;
  height: 500px;
  border: 1px solid #edeeee;
  border-radius: 8px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
</style>
