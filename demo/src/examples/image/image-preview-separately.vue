<template>
  <yk-button @click="visible = true">
    <IconEyeOutline />
    <span>预览</span>
  </yk-button>
  <yk-image-preview
    v-model:visible="visible"
    src="/src/assets/icon/yike.png"
  ></yk-image-preview>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
