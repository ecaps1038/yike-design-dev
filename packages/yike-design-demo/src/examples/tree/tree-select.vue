<template>
  <div>
    <label for="">
      节点多选：
      <yk-switch v-model="isMultiple"></yk-switch>
    </label>
    <yk-tree
      :options="options"
      :default-selected-keys="selectedKeys"
      :multiple="isMultiple"
      :expand-icon="() => h(IconRightOutline)"
      @select="handleSelect"
    ></yk-tree>
  </div>
</template>
<script setup lang="ts">
import { repeat } from 'seemly'
import { h, shallowRef, ref } from 'vue'
import { IconRightOutline } from '@yike-design/ui/components/svg-icon'
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
const isMultiple = ref(false)
const options = shallowRef(createData())
const selectedKeys = ref(['41', '403122'])
const handleSelect = (keys) => {
  console.log('keys: ', keys)
}
</script>
