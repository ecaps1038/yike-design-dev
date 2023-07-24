<template>
  <div :class="[nsPagination.b(), nsPagination.is('disabled', disabled)]">
    <span v-if="showTotal" :class="nsPagination.e('total-text')">
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
      v-bind="extractProps(JumperProps)"
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
import { computed, provide, reactive, ref, toRefs, watch } from 'vue'
import {
  PaginationProps,
  PaginationEmits,
  SubComponentProps,
} from './pagination'
import { useNamespace } from './utils'

import Prev from './components/prev.vue'
import Pager from './components/pager.vue'
import Next from './components/next.vue'
import Jumper from './components/jumper.vue'
import { PagerProps, JumperProps, PrevProps, NextProps } from './components'
import '../style'

const namespace = 'pagination'
provide('namespace', namespace)

const nsPagination = useNamespace(namespace)

defineOptions({
  name: 'YkPagination',
})

const props = defineProps(PaginationProps)
const emits = defineEmits<PaginationEmits>()

const { total, disabled } = toRefs(props)
const internalCurrent = ref<number>(1)

const canPrev = computed(() => internalCurrent.value > 1)
const canNext = computed(() => internalCurrent.value < total.value)

const extractProps = <T extends SubComponentProps>(
  comProps: T,
  ...excludes: (keyof T)[]
) => {
  const newProps = reactive<any>({})
  Object.keys(comProps).forEach((key: any) => {
    if (!excludes.includes(key)) {
      newProps[key] = props[key]
    }
  })
  return newProps
}

const handlePrev = () => internalCurrent.value--
const handleNext = () => internalCurrent.value++
const handleJump = (page: number) => {
  internalCurrent.value = page < 1 ? 1 : page > total.value ? total.value : page
}

watch(
  internalCurrent,
  (newVal) => {
    emits('update:current', newVal)
  },
  { immediate: true },
)
</script>
