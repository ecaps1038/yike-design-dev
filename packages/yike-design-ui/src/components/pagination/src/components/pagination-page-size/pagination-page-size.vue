<template>
  <div :class="cssScope()">
    <yk-dropdown
      :title="dropdownTitle"
      trigger="click"
      @selected="handleSelected"
    >
      <yk-dropdown-item :value="10">10 条/页</yk-dropdown-item>
      <yk-dropdown-item :value="20">20 条/页</yk-dropdown-item>
      <yk-dropdown-item :value="30">30 条/页</yk-dropdown-item>
      <yk-dropdown-item :value="40">40 条/页</yk-dropdown-item>
      <yk-dropdown-item :value="50">50 条/页</yk-dropdown-item>
    </yk-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useCssScope } from '../../utils'
import { YkDropdown, YkDropdownItem } from '../../../../dropdown'

defineOptions({
  name: 'YkPaginationPageSize',
})

const cssScope = useCssScope('page-size')
const selectedPageSize = ref<number>(10)
const dropdownTitle = computed(() => `${selectedPageSize.value} 条/页`)

const handleSelected = (value: number | string | object) => {
  selectedPageSize.value = value as number
}
</script>

<style scoped></style>
