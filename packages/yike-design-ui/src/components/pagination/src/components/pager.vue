<template>
  <span :class="nsPager()" @click="onPagerClick">
    <span
      v-if="total > 0"
      :class="[...pagerCls, isActive(current === 1 && !disabled)]"
      class="number"
    >
      1
    </span>

    <span v-if="showPrevMore" :class="pagerCls" class="prev-more">...</span>

    <span
      v-for="pager in pagers"
      :key="pager"
      :class="[...pagerCls, isActive(pager === current)]"
      class="number"
    >
      {{ pager }}
    </span>

    <span v-if="showNextMore" :class="pagerCls" class="next-more">...</span>

    <span
      v-if="total > 1"
      :class="[...pagerCls, isActive(current === total)]"
      class="number"
    >
      {{ total }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { PagerProps, PagerEmits } from './pager'
import { createCssScope } from '../../../utils/bem'

defineOptions({
  name: 'YkPaginationPager',
})

const nsPager = createCssScope(`pagination-pager`)

const props = defineProps(PagerProps)
const emits = defineEmits<PagerEmits>()

const { current, disabled, fixWidth, total } = toRefs(props)

const pagerCls = computed(() =>
  nsPager('item', {
    s: props.size === 's',
    m: props.size === 'm',
    l: props.size === 'l',
    xl: props.size === 'xl',
  }),
)

const pagerSize = computed(() =>
  props.total > props.pagerCount ? props.pagerCount - 2 : props.total - 2,
)
const pagerMidIndex = computed(() => Math.floor(pagerSize.value / 2))
const showPrevMoreThreshold = computed(() => 2 + pagerMidIndex.value)
const showNextMoreThreshold = computed(
  () => props.total - pagerMidIndex.value - 1,
)
const pagers = computed(() => {
  const array: number[] = []
  if (current.value <= showPrevMoreThreshold.value) {
    for (let i = 0; i < pagerSize.value; i++) {
      array.push(i + 2)
    }
  } else if (
    current.value > showPrevMoreThreshold.value &&
    current.value < showNextMoreThreshold.value
  ) {
    let start: number
    const size = pagerSize.value - (fixWidth.value ? 1 : 0)
    if (size % 2 === 0) {
      start = current.value - size / 2
      fixWidth.value && start++
    } else {
      start = current.value - (size - 1) / 2
    }
    for (let i = 0; i < size; i++) {
      array.push(start + i)
    }
  } else {
    for (let i = 0; i < pagerSize.value; i++) {
      array.push(props.total - (i + 1))
    }
    array.reverse()
  }
  return array
})

const showPrevMore = computed(() =>
  pagerSize.value < props.pagerCount - 2 || props.total === props.pagerCount
    ? false
    : current.value > showPrevMoreThreshold.value,
)
const showNextMore = computed(() =>
  pagerSize.value < props.pagerCount - 2 || props.total === props.pagerCount
    ? false
    : current.value < showNextMoreThreshold.value,
)

const isActive = (activeClause: boolean) =>
  activeClause ? 'yk-pagination-pager__item--active' : ''

function onPagerClick(ev: UIEvent) {
  if (disabled.value) {
    return
  }
  const target = ev.target as HTMLElement
  if (target.tagName === 'SPAN') {
    const { classList } = target
    if (classList.contains('prev-more')) {
      const page = current.value - 5
      emits('update:current', page < 1 ? 1 : page)
    } else if (classList.contains('next-more')) {
      const page = current.value + 5
      emits('update:current', page > total.value ? total.value : page)
    } else if (classList.contains('number')) {
      const page = Number(target.innerText)
      emits('update:current', page)
    }
  }
}
</script>
