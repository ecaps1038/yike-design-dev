<template>
  <div class="container">
    <ul ref="list" class="list">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <yk-back-top :target="list" :style="{ position: 'absolute' }"></yk-back-top>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const list = ref()
</script>
<style>
.container {
  position: relative;
}
.list {
  height: 200px;
  overflow-y: auto;
}
li {
  line-height: 30px;
}
</style>
