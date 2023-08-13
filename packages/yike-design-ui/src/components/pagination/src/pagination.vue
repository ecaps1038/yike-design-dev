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
      :total="total"
      :simple="simple"
      :current="internalCurrent"
      :fix-width="fixWidth"
      :pager-count="pagerCount"
      @change="(page) => (internalCurrent = page)"
    ></pagination-pager>

    <pagination-page-size v-if="showPageSize && !simple"></pagination-page-size>
    <pagination-jumper
      v-if="showJumper && !simple"
      :total="total"
      :size="size"
    ></pagination-jumper>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue'
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
  size: 'l',
  simple: false,
  showTotal: false,
  showJumper: false,
  showPageSize: false,
})
const emits = defineEmits<PaginationEmits>()

const cssScope = useCssScope()
const internalCurrent = ref<number>(1)

const handleJump = (page: number) => {
  if (!props.disabled) {
    internalCurrent.value =
      page < 1 ? 1 : page > props.total ? props.total : page
  }
}

watch(
  () => [props.current, props.defaultCurrent],
  ([current, defaultCurrent]) => {
    internalCurrent.value = current
      ? current
      : defaultCurrent
      ? defaultCurrent
      : 1
  },
  { immediate: true },
)

watch(internalCurrent, (newVal) => {
  if (!props.disabled) {
    emits('update:current', newVal)
  }
})
</script>
