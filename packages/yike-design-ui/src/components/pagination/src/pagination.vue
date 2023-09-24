<template>
  <div
    :class="
      cssScope({
        disabled,
        s: size === 's',
        m: size === 'm',
        l: size === 'l',
        xl: size === 'xl',
      })
    "
  >
    <pagination-total
      v-if="showTotal && !simple"
      :total="total"
    ></pagination-total>

    <pagination-pager
      :total-pages="totalPages"
      :simple="simple"
      :current="internalCurrent"
      :page-size="internalPageSize"
      :fix-width="fixWidth"
      :pager-count="pagerCount"
      :disabled="disabled"
      :size="size"
      @change="handlePageChange"
    ></pagination-pager>

    <pagination-page-size
      v-if="showPageSize && !simple"
      :size="size"
      :disabled="disabled"
      :default-page-size="defaultPageSize"
      :page-size-options="pageSizeOptions"
      @page-size-change="handlePageSizeChange"
    ></pagination-page-size>

    <pagination-jumper
      v-if="showJumper && !simple"
      :total-pages="totalPages"
      :size="size"
      :disabled="disabled"
      @jump="handlePageChange"
    ></pagination-jumper>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, computed } from 'vue'
import {
  PAGINATION_CSS_NAMESPACE,
  PaginationProps,
  PaginationEmits,
} from './pagination'
import { useCssScope } from './utils'
import '../style'

import PaginationTotal from './components/pagination-total/pagination-total.vue'
import PaginationPager from './components/pagination-pager/pagination-pager.vue'
import PaginationPageSize from './components/pagination-page-size/pagination-page-size.vue'
import PaginationJumper from './components/pagination-jumper/pagination-jumper.vue'

defineOptions({
  name: 'YkPagination',
})

provide(PAGINATION_CSS_NAMESPACE, 'pagination')
const props = withDefaults(defineProps<PaginationProps>(), {
  defaultCurrent: 1,
  defaultPageSize: 10,
  disabled: false,
  pagerCount: 7,
  pageSizeOptions: () => [10, 20, 30, 40, 50],
  size: 'l',
  simple: false,
  showTotal: false,
  showJumper: false,
  showPageSize: false,
})
const emits = defineEmits<PaginationEmits>()

const cssScope = useCssScope()

const internalCurrent = ref<number>(1)
const internalPageSize = ref<number>(10)
const totalPages = computed(() =>
  internalPageSize.value < 0
    ? 1
    : Math.ceil(props.total / internalPageSize.value),
)

const handlePageChange = (page: number) => {
  if (!props.disabled) {
    internalCurrent.value = page
    emits('change', page)
  }
}

const handlePageSizeChange = (pageSize: number) => {
  if (!props.disabled) {
    internalPageSize.value = pageSize
    emits('pageSizeChange', pageSize)
  }
}

watch(
  () => [props.current, props.defaultCurrent],
  ([current, defaultCurrent]) => {
    if (props.disabled) {
      internalCurrent.value = 0
    } else {
      internalCurrent.value = current
        ? current
        : defaultCurrent
        ? defaultCurrent
        : 1
    }
  },
  { immediate: true },
)

watch(
  () => [props.pageSize, props.defaultPageSize],
  ([pageSize, defaultPageSize]) => {
    internalPageSize.value = pageSize
      ? pageSize
      : defaultPageSize
      ? defaultPageSize
      : 10
  },
  { immediate: true },
)

watch(internalCurrent, (newVal) => {
  if (!props.disabled) {
    emits('update:current', newVal)
  }
})
</script>
