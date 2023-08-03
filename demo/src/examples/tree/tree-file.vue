<template>
  <yk-tree
    :options="options"
    :default-expanded-keys="expandedKey"
    file-tree
  ></yk-tree>
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
const options = shallowRef(createData(3))
const expandedKey = ref(['312010'])
</script>
