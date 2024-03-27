<template>
  <yk-space overflow="auto">
    <yk-pagination
      v-model:current="current"
      :total="1000"
      @change="handleChange"
      @page-size-change="handlePageSizeChange"
    />
  </yk-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref<number>(3)

function handleChange(current: number) {
  console.log(`current page is: ${current}`)
}

function handlePageSizeChange(pageSize: number) {
  console.log(`current page size is: ${pageSize}`)
}
</script>
