<template>
  <yk-tree
    :options="options"
    :default-expanded-keys="expandedKey"
    file-tree
    :file-icons="{
      fold: () => h(IconAppFill),
      unfold: () => h(IconAppOutline),
      file: () => h(IconSmileOutline),
    }"
  ></yk-tree>
</template>
<script setup lang="ts">
import { repeat } from 'seemly'
import { h, shallowRef, ref } from 'vue'
import {
  IconAppOutline,
  IconAppFill,
  IconSmileOutline,
  IconPptOutline,
} from '@yike-design/ui/components/svg-icon'
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
options.value[1]
options.value[1].children[0].children[0].icons = {
  file: () => h(IconPptOutline),
}
const expandedKey = ref(['312010'])
</script>
