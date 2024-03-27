<template>
  <div :class="bem()" @click="handleCurrentChange">
    <div :class="bem('item', { active: isFirstPage })" @click="cur = 1">1</div>
    <div v-if="showBeforeMore" :class="bem('more')" @click="onMore('prev')">
      ...
    </div>
    <div
      v-for="page in getPages"
      :key="page"
      :class="bem('item', { active: cur === page })"
      @click="cur = page"
    >
      {{ page }}
    </div>
    <div v-if="showAfterMore" :class="bem('more')" @click="onMore('next')">
      ...
    </div>
    <div
      v-if="lastPage > 1"
      :class="bem('item', { active: isLastPage })"
      @click="cur = lastPage"
    >
      {{ lastPage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createCssScope } from '../../utils'
import type { PgnInfo } from './pagination'

interface Props {
  pagerCount: number
  fixWidth: boolean
}

const props = defineProps<Props>()
const bem = createCssScope('pagination-pager')

const {
  _current: cur,
  lastPage,
  isFirstPage,
  isLastPage,
} = inject('info') as PgnInfo

const halfPagerCount = Math.ceil(props.pagerCount / 2)
const middlePageIndex = Math.floor((props.pagerCount - 2) / 2)

const isShowMore = computed(() => lastPage.value > props.pagerCount)
const showBeforeMore = computed(
  () => isShowMore.value && cur.value > halfPagerCount,
)
const showAfterMore = computed(
  () => isShowMore.value && cur.value + halfPagerCount <= lastPage.value,
)

const getPages = computed(() => {
  const result = [] as number[]
  let current = cur.value

  if (cur.value > halfPagerCount) {
    while (current + middlePageIndex + 1 > lastPage.value) {
      current--
    }
    const min = current - middlePageIndex
    const max = current + middlePageIndex

    for (let i = props.fixWidth ? min + 1 : min; i <= max; i++) {
      result.push(i)
    }
  } else {
    for (let i = 2; i < props.pagerCount; i++) {
      result.push(i)
    }
  }

  return result.filter((item) => 1 < item && item < lastPage.value)
})

function handleCurrentChange(e: MouseEvent) {
  const target = e.target as HTMLElement

  if (target.classList.contains(bem('item') as string)) {
    cur.value = Number(target.textContent)
  }
}

function onMore(mode: 'prev' | 'next') {
  const carry = props.pagerCount - 2

  if (mode === 'prev') {
    const target = cur.value - carry
    cur.value = target > 1 ? target : 1
  } else {
    const target = cur.value + carry
    cur.value = target < lastPage.value ? target : lastPage.value
  }
}
</script>
