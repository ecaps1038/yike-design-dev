<template>
  <yk-space dir="vertical" align="start">
    <yk-date-picker
      v-model="date"
      :disabled-date="disabledDate"
      placeholder="只能选择工作日"
      style="width: 240px"
    />
    <span>已禁用周末：{{ formatted }}</span>
  </yk-space>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const date = ref<Date>()
const disabledDate = (current: Date) => {
  const day = current.getDay()
  return day === 0 || day === 6
}
const formatted = computed(() =>
  date.value ? dayjs(date.value).format('YYYY-MM-DD') : '未选择',
)
</script>
