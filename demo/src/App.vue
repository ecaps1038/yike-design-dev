<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue'
</script>

<template>
  <div class="app">
    <TopBar />
    <RouterView />
    <!-- <RouterLink to="hh">hh</RouterLink> -->
    <yk-back-top />
  </div>
</template>

<style scoped lang="less">
.app {
  padding-top: 60px;
}
</style>
