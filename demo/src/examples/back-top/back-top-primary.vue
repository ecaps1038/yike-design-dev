<template>
  <div class="container">
    <ul ref="list" class="list">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <yk-back-top
      :target="list"
      theme="secondary"
      behavior="instant"
      :style="{ position: 'absolute' }"
    ></yk-back-top>
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
  overflow-y: auto;
  height: 200px;
}
li {
  line-height: 30px;
}
</style>
