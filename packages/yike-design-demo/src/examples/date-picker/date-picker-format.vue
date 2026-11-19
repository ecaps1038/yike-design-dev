<template>
  <yk-space dir="vertical" align="start">
    <yk-date-picker
      v-model="value"
      value-format="YYYY/MM/DD"
      format="YYYY 年 MM 月 DD 日"
      style="width: 240px"
    />
    <span>v-model 字符串：{{ value || '空' }}</span>
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2026/01/15')
</script>
