<template>
  <div>
    <label for="">
      父子是否关联：
      <yk-switch v-model="checkStrictly"></yk-switch>
    </label>
    <yk-tree
      v-model:checkedKeys="checkedKeys"
      :options="options"
      :check-strictly="checkStrictly"
      checkable
    ></yk-tree>
    {{ checkedKeys }}
  </div>
</template>
<script setup lang="ts">
import { repeat } from 'seemly'
import { shallowRef, ref } from 'vue'
function createData(level = 4, baseKey = '') {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
    }
  })
}
function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
const checkStrictly = ref(true)
const options = shallowRef(createData())
const checkedKeys = ref(['41', '403122'])
</script>
