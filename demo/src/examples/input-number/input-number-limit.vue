<template>
  <yk-space direction="vertical">
    <p>试试点击几次“增加”按钮</p>
    <yk-input-number
      v-model="number"
      :max="10"
      style="width: 300px"
    ></yk-input-number>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const number = ref(6)
</script>
