<template>
  <yk-button @click="active = true">打开抽屉</yk-button>
  <div id="drawer-hub"></div>
  <yk-drawer
    title="你好，世界。"
    :show="active"
    to="#drawer-hub"
    :scrollable="true"
    placement="left"
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
<style scoped lang="less">
#drawer-hub {
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  width: 100%;
  height: 500px;
  border: 1px solid @gray-1;
  border-radius: 8px;
}
</style>
