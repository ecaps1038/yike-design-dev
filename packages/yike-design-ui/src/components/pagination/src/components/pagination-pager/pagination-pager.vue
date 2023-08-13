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
      :total="total"
      :simple="simple"
    ></pagination-jumper>

    <span
      v-if="!simple"
      :class="[
        ...cssScope('item', { active: current === total }),
        cssScope('item-number'),
      ]"
    >
      {{ total }}
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

defineOptions({
  name: 'YkPaginationPager',
})
const props = withDefaults(defineProps<PagerProps>(), {
  pagerCount: 7,
})
const emits = defineEmits<PagerEmits>()

const cssScope = useCssScope('pager')

const canPrev = computed(() => props.current > 1)
const canNext = computed(() => props.current < props.total)
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
  if (props.simple) {
    return array
  }
  if (props.current <= showPrevMoreThreshold.value) {
    for (let i = 0; i < pagerSize.value; i++) {
      array.push(i + 2)
    }
  } else if (
    props.current > showPrevMoreThreshold.value &&
    props.current < showNextMoreThreshold.value
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
      array.push(props.total - (i + 1))
    }
    array.reverse()
  }
  return array
})

const showPrevEllispsis = computed(() =>
  pagerSize.value < props.pagerCount - 2 || props.total === props.pagerCount
    ? false
    : props.current > showPrevMoreThreshold.value,
)
const showNextEllispsis = computed(() =>
  pagerSize.value < props.pagerCount - 2 || props.total === props.pagerCount
    ? false
    : props.current < showNextMoreThreshold.value,
)

const prev = () => {
  if (props.current > 1) {
    emits('change', props.current - 1)
  }
}

const next = () => {
  if (props.current < props.total) {
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
  emits('change', page < 1 ? 1 : page > props.total ? props.total : page)
}
</script>

<style scoped></style>
