<template>
  <div :class="cssScope()">
    <yk-dropdown
      :title="dropdownTitle"
      :size="size"
      :disabled="disabled"
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
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useCssScope } from '../../utils'
import { YkDropdown, YkDropdownItem } from '../../../../dropdown'
import type { PageSizeProps, PageSizeEmits } from './pagination-page-size'

defineOptions({
  name: 'YkPaginationPageSize',
})

const props = defineProps<PageSizeProps>()
const emits = defineEmits<PageSizeEmits>()

const cssScope = useCssScope('page-size')
const selectedPageSize = ref<number>(10)
const dropdownTitle = computed(() =>
  selectedPageSize.value < 0 ? '全部' : `${selectedPageSize.value} 条/页`,
)

const handleSelected = (value: number | string | object) => {
  selectedPageSize.value = value as number
  emits('pageSizeChange', selectedPageSize.value)
}

watch(
  () => props.defaultPageSize,
  (newVal) => {
    if (newVal) {
      selectedPageSize.value = newVal
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
