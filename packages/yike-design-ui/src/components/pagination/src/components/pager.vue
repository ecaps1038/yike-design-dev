<template>
  <ul :class="nsPager.b()" @click="onPagerClick">
    <li
      v-if="total > 0"
      :class="[...pagerCls, nsPager.is('active', !disabled && current === 1)]"
    >
      1
    </li>

    <li :class="pagerCls" class="prev-more" v-if="showPrevMore">...</li>

    <li
      v-for="pager in pagers"
      :key="pager"
      :class="[...pagerCls, nsPager.is('active', current === pager)]"
    >
      {{ pager }}
    </li>

    <li :class="pagerCls" class="next-more" v-if="showNextMore">...</li>

    <li
      v-if="total > 1"
      :class="[...pagerCls, nsPager.is('active', current === total)]"
    >
      {{ total }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, inject, toRefs } from 'vue'
import { PagerProps, PagerEmits, defaultPagerProps } from './pager'
import { useNamespace } from '../../../../utils/hooks'

defineOptions({
  name: 'YkPaginationPager',
})

const namespace = inject('namespace', 'pagination')
const nsPager = useNamespace(`${namespace}-pager`)

const props = withDefaults(defineProps<PagerProps>(), defaultPagerProps)
const emits = defineEmits<PagerEmits>()

const { current, disabled, fixWidth } = toRefs(props)

const pagerCls = computed(() => [
  nsPager.e('item'),
  nsPager.em('item', props.size),
])

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
      fixWidth.value && start--
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

function onPagerClick(ev: UIEvent) {
  if (disabled.value) {
    return
  }
  const target = ev.target as HTMLElement
  if (target.tagName === 'LI') {
    const { classList } = target
    if (classList.contains('prev-more')) {
      emits('update:current', current.value - 5)
    } else if (classList.contains('next-more')) {
      emits('update:current', current.value + 5)
    } else {
      const page = Number(target.innerText)
      emits('update:current', page)
    }
  }
}
</script>

<style scoped></style>
