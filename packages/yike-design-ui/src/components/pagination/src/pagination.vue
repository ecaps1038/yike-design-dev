<template>
  <div :class="[nsPagination.b(), nsPagination.is('disabled', disabled)]">
    <prev @prev="handlePrev" :disabled="disabled || !canPrev"></prev>
    <pager
      v-model:current="internalCurrent"
      :disabled="disabled"
      :fix-width="fixWidth"
      :total="total"
      :pager-count="pagerCount"
    ></pager>
    <next @next="handleNext" :disabled="disabled || !canNext"></next>
    <jumper @jump="handleJump" v-if="showJumper" :disabled="disabled"></jumper>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, toRefs } from 'vue'
import {
  PaginationProps,
  PaginationEmits,
  defaultPaginationProps,
} from './pagination'
import { useNamespace } from '../../../utils/hooks'

import Prev from './components/prev.vue'
import Pager from './components/pager.vue'
import Next from './components/next.vue'
import Jumper from './components/jumper.vue'
import '../style'

const namespace = 'pagination'
provide('namespace', namespace)

defineOptions({
  name: 'YkPagination',
})

const props = withDefaults(
  defineProps<PaginationProps>(),
  defaultPaginationProps,
)
defineEmits<PaginationEmits>()

const { total, disabled } = toRefs(props)
const internalCurrent = ref<number>(1)

const canPrev = computed(() => internalCurrent.value > 1)
const canNext = computed(() => internalCurrent.value < total.value)

const handlePrev = () => internalCurrent.value--
const handleNext = () => internalCurrent.value++
const handleJump = (page: number) => {
  internalCurrent.value = page < 1 ? 1 : page > total.value ? total.value : page
}

const nsPagination = useNamespace(namespace)
</script>
