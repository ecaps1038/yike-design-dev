<script setup lang="ts">
import TopBar from './components/TopBar.vue'
</script>

<template>
  <div class="app">
    <TopBar />
    <RouterView />
    <yk-back-top />
  </div>
</template>

<style scoped lang="less">
.app {
  padding-top: 60px;
}
</style>
