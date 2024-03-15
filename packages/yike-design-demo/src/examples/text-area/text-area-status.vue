<template>
  <yk-text-area
    v-model="val"
    clearable
    placeholder="请输入..."
    disabled
  ></yk-text-area>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const val = ref('')
</script>
