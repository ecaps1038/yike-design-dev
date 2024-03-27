<template>
  <yk-space dir="vertical">
    <yk-switch v-model="disabled"></yk-switch>
    <yk-pagination
      :total="100"
      :layouts="['total', 'prev', 'pager', 'next', 'jumper', 'pageSize']"
      :disabled="disabled"
    />
  </yk-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
</script>
