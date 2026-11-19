<template>
  <yk-space dir="vertical" align="start">
    <yk-date-picker v-model="date" style="width: 240px" />
    <span>当前值：{{ formatted }}</span>
  </yk-space>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const date = ref<Date | null>(new Date())
const formatted = computed(() =>
  date.value ? dayjs(date.value).format('YYYY-MM-DD') : '空',
)
</script>
