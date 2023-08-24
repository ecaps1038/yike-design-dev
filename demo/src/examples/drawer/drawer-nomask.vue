<template>
  <yk-space>
    <yk-button @click="active = true">打开抽屉</yk-button>
  </yk-space>
  <yk-drawer
    title="你好，世界。"
    :show="active"
    :show-mask="false"
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
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
    <h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>
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
