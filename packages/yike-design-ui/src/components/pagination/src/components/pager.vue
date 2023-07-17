<template>
  <ul :class="nsPager.b('pager')" @click="onPagerClick">
    <li :class="[...pagerCls, firstPagerIsActive]" v-if="total > 0">1</li>

    <li
      :class="[
        nsPager.be('pager', 'quick-prev'),
        nsPager.bem('pager', 'quick-prev', size),
      ]"
      v-if="showPrevMore"
    >
      <yk-icon name="yk-gengduo"></yk-icon>
    </li>

    <li
      v-for="pager in pagers"
      :key="pager"
      :class="[...pagerCls, pager === current ? 'active' : '']"
    >
      {{ pager }}
    </li>

    <li
      :class="[
        nsPager.be('pager', 'quick-next'),
        nsPager.bem('pager', 'quick-next', size),
      ]"
      v-if="showNextMore"
    >
      <yk-icon name="yk-gengduo"></yk-icon>
    </li>

    <li :class="[...pagerCls, lastPagerIsActive]" v-if="total > 1">
      {{ total }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { PagerProps, PagerEmits, defaultPagerProps } from './pager'
import { useNamespace } from '../../../../utils/hooks'

import YkIcon from '../../../icon'

defineOptions({
  name: 'YkPaginationPager',
})

const namespace = inject('namespace', 'pagination')
const nsPager = useNamespace(namespace)

const props = withDefaults(defineProps<PagerProps>(), defaultPagerProps)
const emits = defineEmits<PagerEmits>()

const pagerCls = computed(() => [
  nsPager.be('pager', 'number'),
  nsPager.bem('pager', 'number', props.size),
  props.disabled ? 'disabled' : '',
  //nsPager.bem('pager', 'number', 'active'),
])
const firstPagerIsActive = computed(() => (props.current === 1 ? 'active' : ''))
const lastPagerIsActive = computed(() =>
  props.current === props.total ? 'active' : '',
)

const pagerStart = computed(() => 1)
const pagerSize = computed(() =>
  props.total > props.pagerCount ? props.pagerCount - 2 : props.total,
)
const pagers = computed(() => {
  const array: number[] = []
  for (let i = 0; i < pagerSize.value; i++) {
    array.push(pagerStart.value + i + 1)
  }
  return array
})

const showPrevMore = computed(() => false)
const showNextMore = computed(() => props.total > props.pagerCount)

function onPagerClick(ev: UIEvent) {
  const target = ev.target as HTMLElement
}
</script>

<style scoped></style>
