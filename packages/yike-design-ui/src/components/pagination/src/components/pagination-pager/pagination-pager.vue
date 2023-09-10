<template>
  <div :class="cssScope()" @click="handlePagerClick">
    <span
      :class="[
        ...cssScope('item', {
          disabled: !canPrev,
        }),
        cssScope('item-prev'),
      ]"
    >
      <IconLeftOutline @click.stop="prev()" />
    </span>

    <span
      v-if="!simple"
      :class="[
        ...cssScope('item', { active: current === 1 }),
        cssScope('item-number'),
      ]"
    >
      1
    </span>

    <span
      v-if="showPrevEllispsis && !simple"
      :class="[cssScope('item'), cssScope('item-ellipsis')]"
      @click.prevent="() => handleEllispsisClick('prev')"
    >
      ...
    </span>

    <span
      v-for="pager in pagers"
      :key="pager"
      :class="[
        ...cssScope('item', { active: current === pager }),
        cssScope('item-number'),
      ]"
    >
      {{ pager }}
    </span>

    <span
      v-if="showNextEllispsis && !simple"
      :class="[cssScope('item'), cssScope('item-ellipsis')]"
      @click.prevent="() => handleEllispsisClick('next')"
    >
      ...
    </span>

    <pagination-jumper
      v-if="simple"
      :current="current"
      :total-pages="totalPages"
      :simple="simple"
      :size="size"
      :disabled="disabled"
      @jump="(page) => emits('change', page)"
    ></pagination-jumper>

    <span
      v-if="!simple && totalPages >= 2"
      :class="[
        ...cssScope('item', { active: current === totalPages }),
        cssScope('item-number'),
      ]"
    >
      {{ totalPages }}
    </span>

    <span
      :class="[
        ...cssScope('item', {
          disabled: !canNext,
        }),
        cssScope('item-next'),
      ]"
    >
      <IconRightOutline @click.stop="next()" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCssScope } from '../../utils'
import type { PagerProps, PagerEmits } from './pagination-pager'
import PaginationJumper from '../pagination-jumper/pagination-jumper.vue'
import { IconLeftOutline, IconRightOutline } from '../../../../svg-icon'

defineOptions({
  name: 'YkPaginationPager',
})

const props = withDefaults(defineProps<PagerProps>(), {
  pagerCount: 7,
})
const emits = defineEmits<PagerEmits>()

const cssScope = useCssScope('pager')

const canPrev = computed(() => props.current > 1)
const canNext = computed(() => props.current < props.totalPages)
const pagerSize = computed(() =>
  props.totalPages > props.pagerCount
    ? props.pagerCount - 2
    : props.totalPages - 2,
)
const pagerMidIndex = computed(() => Math.floor(pagerSize.value / 2))

const showPrevEllispsisThreshold = computed(() => pagerMidIndex.value + 1)
const showPrevEllispsis = computed(() =>
  pagerSize.value < props.pagerCount - 2 ||
  props.totalPages === props.pagerCount
    ? false
    : props.current > showPrevEllispsisThreshold.value,
)

const showNextEllispsisThreshold = computed(
  () => props.totalPages - pagerMidIndex.value - 1,
)
const showNextEllispsis = computed(() =>
  pagerSize.value < props.pagerCount - 2 ||
  props.totalPages === props.pagerCount
    ? false
    : props.current < showNextEllispsisThreshold.value,
)

const pagers = computed(() => {
  const array: number[] = []
  if (props.simple || pagerSize.value < 2) {
    return array
  }

  if (props.current <= showPrevEllispsisThreshold.value) {
    for (let i = 0; i < pagerSize.value; i++) {
      array.push(i + 2)
    }
  } else if (
    props.current > showPrevEllispsisThreshold.value &&
    props.current < showNextEllispsisThreshold.value
  ) {
    let start: number
    const size = pagerSize.value - (props.fixWidth ? 1 : 0)
    if (size % 2 === 0) {
      start = props.current - size / 2
      props.fixWidth && start++
    } else {
      start = props.current - (size - 1) / 2
    }
    for (let i = 0; i < size; i++) {
      array.push(start + i)
    }
  } else {
    for (let i = 0; i < pagerSize.value; i++) {
      array.push(props.totalPages - (i + 1))
    }
    array.reverse()
  }
  return array
})

const prev = () => {
  if (props.current > 1) {
    emits('change', props.current - 1)
  }
}

const next = () => {
  if (props.current < props.totalPages) {
    emits('change', props.current + 1)
  }
}

const handlePagerClick = (ev: MouseEvent) => {
  const target = ev.target as HTMLElement
  const itemPrefix = 'yk-pagination-pager__item'
  if (target.tagName === 'SPAN') {
    const { classList } = target
    if (classList.contains(`${itemPrefix}-prev`)) {
      prev()
    } else if (classList.contains(`${itemPrefix}-next`)) {
      next()
    } else if (classList.contains(`${itemPrefix}-number`)) {
      const page = Number(target.innerText)
      emits('change', page)
    }
  }
}

const handleEllispsisClick = (type: 'prev' | 'next') => {
  let page: number
  if (type === 'prev') {
    page = props.current - 5
  } else {
    page = props.current + 5
  }
  emits(
    'change',
    page < 1 ? 1 : page > props.totalPages ? props.totalPages : page,
  )
}
</script>

<style scoped></style>
