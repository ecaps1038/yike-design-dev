<template>
  <yk-pagination
    v-model:current="current"
    :total="1000"
    show-jumper
    show-page-size
    show-total
    @change="handleChange"
    @page-size-change="handlePageSizeChange"
  ></yk-pagination>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
const current = ref<number>(3)
const handleChange = (current: number) => {
  console.log(`current page is: ${current}`)
}
const handlePageSizeChange = (pageSize: number) => {
  console.log(`current page size is: ${pageSize}`)
}
watch(current, (newVal) => {
  console.log(`v-model value is: ${newVal}`)
})
</script>
