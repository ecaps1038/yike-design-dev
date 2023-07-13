<template>
  <div style="position: relative">
    <ul ref="list" style="height: 200px; overflow-y: auto">
      <li
        style="line-height: 30px"
        v-for="(_, index) of Array(40)"
        :key="index"
      >
        This is the content
      </li>
    </ul>
    <yk-back-top :target="list" :style="{ position: 'absolute' }"></yk-back-top>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const list = ref()
</script>
