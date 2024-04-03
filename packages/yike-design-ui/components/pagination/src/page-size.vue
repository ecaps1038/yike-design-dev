<template>
  <yk-dropdown
    :class="bem()"
    :title="title"
    :size="size"
    trigger="click"
    @selected="handleSelected"
  >
    <yk-dropdown-item
      v-for="pageSize in pageSizeOptions"
      :key="pageSize"
      :value="pageSize"
    >
      {{ pageSize === -1 ? '全部' : `${pageSize} 条/页` }}
    </yk-dropdown-item>
  </yk-dropdown>
</template>

<script setup lang="ts">
import { YkDropdown, YkDropdownItem } from '../../dropdown'
import type { PaginationProps, PgnInfo } from './pagination'
import { createCssScope } from '../../utils'
import { computed, ref, inject } from 'vue'

type PageSizeProps = Required<Pick<PaginationProps, 'pageSizeOptions'>>
type PageSizeEmits = {
  (e: 'update:pageSize', pageSize: number): void
}

defineProps<PageSizeProps>()
const emits = defineEmits<PageSizeEmits>()
const bem = createCssScope('pagination-page-size')

const { size } = inject('info') as PgnInfo
const selectedPageSize = ref(10)

const title = computed(() => {
  if (selectedPageSize.value < 0) return '全部'
  return `${selectedPageSize.value} 条/页`
})

function handleSelected(value: number | string | object) {
  selectedPageSize.value = value as number
  emits('update:pageSize', selectedPageSize.value)
}
</script>
