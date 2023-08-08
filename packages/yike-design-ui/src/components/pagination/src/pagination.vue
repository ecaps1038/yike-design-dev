<template>
  <div
    :class="[
      nsPagination({
        disabled: disabled,
      }),
    ]"
  >
    <span v-if="showTotal" :class="nsPagination('total-text')">
      {{ total }}
    </span>
    <prev
      :disabled="disabled || !canPrev"
      v-bind="extractProps(PrevProps, 'disabled')"
      @prev="handlePrev"
    ></prev>
    <pager
      v-if="!simple"
      v-bind="extractProps(PagerProps, 'current')"
      v-model:current="internalCurrent"
    ></pager>
    <jumper
      v-else
      v-bind="extractProps(JumperProps, 'current')"
      :current="internalCurrent"
      @jump="handleJump"
    ></jumper>
    <next
      :disabled="disabled || !canNext"
      v-bind="extractProps(NextProps, 'disabled')"
      @next="handleNext"
    ></next>
    <jumper
      v-if="showJumper && !simple"
      v-bind="extractProps(JumperProps)"
      @jump="handleJump"
    ></jumper>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs, ref, watch, onMounted } from 'vue'
import {
  PaginationProps,
  PaginationEmits,
  SubComponentProps,
} from './pagination'
import { createCssScope } from '../../utils/bem'

import Prev from './components/prev.vue'
import Pager from './components/pager.vue'
import Next from './components/next.vue'
import Jumper from './components/jumper.vue'
import { PagerProps, JumperProps, PrevProps, NextProps } from './components'
import '../style'

const nsPagination = createCssScope('pagination')

defineOptions({
  name: 'YkPagination',
})

const props = defineProps(PaginationProps)
const emits = defineEmits<PaginationEmits>()

const internalCurrent = ref<number>(1)
const { total, disabled, current } = toRefs(props)

const canPrev = computed(() => internalCurrent.value > 1)
const canNext = computed(() => internalCurrent.value < total.value)

const extractProps = <T extends SubComponentProps>(
  comProps: T,
  ...excludes: (keyof T)[]
) => {
  const newProps = reactive<any>({})
  Object.keys(comProps).forEach((key: any) => {
    if (!excludes.includes(key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newProps[key] = props[key]
    }
  })
  return newProps
}

const handlePrev = () => !disabled.value && internalCurrent.value--
const handleNext = () => !disabled.value && internalCurrent.value++
const handleJump = (page: number) => {
  if (!disabled.value) {
    internalCurrent.value =
      page < 1 ? 1 : page > total.value ? total.value : page
  }
}

onMounted(() => {
  if (!disabled.value) {
    internalCurrent.value = current.value
  }
})

watch(internalCurrent, (newVal) => {
  if (!disabled.value) {
    emits('update:current', newVal)
  }
})
</script>
