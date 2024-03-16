<template>
  <yk-button @click="visible = true">
    <IconEyeOutline />
    <span>预览</span>
  </yk-button>
  <yk-image-preview
    v-model:visible="visible"
    src="https://www.huohuo90.com:3005/logo/yike.png"
  ></yk-image-preview>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
