<template>
  <div>
    <YkSpace align="center">
      <label for="">
        关闭父子关联：
        <yk-switch v-model="checkStrictly"></yk-switch>
      </label>
      <yk-radio-group v-model="checkStrategy" type="button">
        <yk-radio value="all">父亲和孩儿们</yk-radio>
        <yk-radio value="parent">父亲们</yk-radio>
        <yk-radio value="child">孩儿们</yk-radio>
      </yk-radio-group>
    </YkSpace>
    <yk-tree
      v-model:checkedKeys="checkedKeys"
      :options="options"
      :check-strictly="checkStrictly"
      :check-strategy="checkStrategy"
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
const checkStrictly = ref(false)
const checkStrategy = ref<any>('all')
const options = shallowRef(createData())
const checkedKeys = ref(['0-3-0-2'])
</script>
