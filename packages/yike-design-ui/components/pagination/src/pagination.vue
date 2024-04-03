<template>
  <div v-if="simple" :class="classes">
    <Control icon="prev" :disabled="isFirstPage" @click="onPrev" />
    <YkInputNumber
      v-model="_current"
      :min="1"
      :max="lastPage"
      :controls="false"
      :size="size"
    />
    <div :class="bem('total')">{{ lastPage }}</div>
    <Control icon="next" :disabled="isLastPage" @click="onNext" />
  </div>
  <div v-else-if="!hidden" :class="classes">
    <template v-for="[key, comp] in Object.entries(_layouts)" :key="key">
      <component :is="comp" />
    </template>
  </div>
</template>

<script setup lang="ts">
import Pager from './pager.vue'
import Jumper from './jumper.vue'
import Control from './control.vue'
import PageSize from './page-size.vue'
import YkInputNumber from '../../input-number'

import type {
  PaginationProps,
  PaginationEmits,
  LayoutMapType,
} from './pagination'
import { createCssScope } from '../../utils'
import { ref, computed, watch, h, provide } from 'vue'
import '../style'

defineOptions({ name: 'YkPagination' })

const bem = createCssScope('pagination')
const emits = defineEmits<PaginationEmits>()

// prettier-ignore
const props = withDefaults(
  defineProps<PaginationProps>(),
  {
    current: 1,
    pageSize: 10,
    defaultCurrent: 1,
    defaultPageSize: 10,
    pagerCount: 7,
    size: 'l',
    simple: false,
    fixWidth: false,
    disabled: false,
    hideOnSinglePage: false,
    layouts: () => ['prev', 'pager', 'next'],
    pageSizeOptions: () => [10, 20, 30, 40, 50],
  }
)

const _current = ref(props.defaultCurrent)
const _pageSize = ref(props.defaultPageSize)

const lastPage = computed(() => Math.ceil(props.total / _pageSize.value))
const hidden = computed(() => props.hideOnSinglePage && lastPage.value === 1)
const classes = computed(() => bem({ disabled: props.disabled }, [props.size]))
const isFirstPage = computed(() => _current.value === 1)
const isLastPage = computed(() => _current.value === lastPage.value)

provide('info', {
  _current,
  _pageSize,
  lastPage,
  isFirstPage,
  isLastPage,
  size: ref(props.size),
})

const layoutMap: LayoutMapType = {
  pager: h(Pager, {
    pagerCount: props.pagerCount,
    fixWidth: props.fixWidth,
  }),
  prev: h(Control, {
    icon: 'prev',
    onClick: onPrev,
  }),
  next: h(Control, {
    icon: 'next',
    onClick: onNext,
  }),
  total: h('div', null, `共 ${props.total} 条`),
  jumper: h(Jumper),
  pageSize: h(PageSize, {
    size: props.size!,
    pageSizeOptions: props.pageSizeOptions,
    'onUpdate:pageSize': (pageSize: number) => {
      if (!props.disabled) _pageSize.value = pageSize
    },
  }),
}

// prettier-ignore
const _layouts = props.layouts.reduce(
  (acc, cur) => {
    acc[cur] = layoutMap[cur]
    return acc
  }, {} as LayoutMapType
)

watch(
  () => props.current,
  (val) => (_current.value = val),
)
watch(_current, (newVal) => {
  emits('update:current', newVal)
  emits('change', newVal)
})

watch(
  () => props.pageSize,
  (val) => (_pageSize.value = val),
)
watch(_pageSize, (newVal) => {
  emits('update:pageSize', newVal)
  emits('pageSizeChange', newVal)
})

function onPrev() {
  if (!props.disabled && _current.value > 1) {
    _current.value--
  }
}

function onNext() {
  if (!props.disabled && _current.value < lastPage.value) {
    _current.value++
  }
}
</script>
