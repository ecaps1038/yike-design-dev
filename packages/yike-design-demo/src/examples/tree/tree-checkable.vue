<template>
  <div>
    <yk-tree
      v-model:checkedKeys="checkedKeys"
      :options="options"
      checkable
    ></yk-tree>
    {{ checkedKeys }}
  </div>
</template>
<script setup lang="ts">
import { repeat } from 'seemly'
import { shallowRef, ref } from 'vue'
function createData(level = 3, pk = '') {
  if (!level) return undefined
  return repeat(5 - level, undefined).map((_, index) => {
    const key = `${pk ? pk + '-' : ''}${index}-${level}`
    return {
      label: key,
      key,
      children: createData(level - 1, key),
    }
  })
}
const options = shallowRef(createData())
const checkedKeys = ref([])
</script>
