<template>
  <yk-text-area
    v-model="val"
    clearable
    placeholder="请输入..."
    :auto-size="{
      minRows: 4,
      maxRows: 10,
    }"
  ></yk-text-area>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const val = ref('')
</script>
