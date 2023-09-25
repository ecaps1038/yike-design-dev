<template>
  <yk-space dir="vertical">
    <yk-checkbox
      :checked="checkedAll"
      :indeterminate="indeterminate"
      @change="handleChangeAll"
    >
      Check All
    </yk-checkbox>
    <yk-checkbox-group v-model="data" @change="handleChange">
      <yk-checkbox value="1">Option 1</yk-checkbox>
      <yk-checkbox value="2">Option 2</yk-checkbox>
      <yk-checkbox value="3">Option 3</yk-checkbox>
    </yk-checkbox-group>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const indeterminate = ref(false)
const checkedAll = ref(false)
const data = ref([])
const handleChangeAll = (value) => {
  indeterminate.value = false
  if (value) {
    checkedAll.value = true
    data.value = ['1', '2', '3']
  } else {
    checkedAll.value = false
    data.value = []
  }
}
const handleChange = (values) => {
  if (values.length === 3) {
    checkedAll.value = true
    indeterminate.value = false
  } else if (values.length === 0) {
    checkedAll.value = false
    indeterminate.value = false
  } else {
    checkedAll.value = false
    indeterminate.value = true
  }
}
</script>
