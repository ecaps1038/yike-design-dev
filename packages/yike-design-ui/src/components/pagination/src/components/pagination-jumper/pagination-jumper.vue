<template>
  <span :class="cssScope()">
    <span v-if="!simple" :class="cssScope('label')">前往</span>
    <yk-input
      v-model="inputValue"
      :size="size"
      :disabled="disabled"
      @blur="changePage"
      @submit="changePage"
    ></yk-input>
    <span v-if="simple" :class="cssScope('separator')">/</span>
    <span v-if="simple" :class="cssScope('total')">{{ totalPages }}</span>
  </span>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { JumperProps, JumperEmits } from './pagination-jumper'
import { useCssScope } from '../../utils'
import YkInput from '../../../../input'

defineOptions({
  name: 'YkPaginationJumper',
})

const props = defineProps<JumperProps>()
const emits = defineEmits<JumperEmits>()
const cssScope = useCssScope('jumper')
const inputValue = ref<string>('')

const isNumber = (val: string) => {
  return /^[1-9][0-9]*$/.test(val)
}

const changePage = () => {
  if (isNumber(inputValue.value)) {
    let page = parseInt(inputValue.value)
    page = page > props.totalPages ? props.totalPages : page < 1 ? 1 : page
    emits('jump', page)
  }
  if (!props.simple) {
    inputValue.value = ''
  }
}

watch(
  () => props.current,
  (newVal) => {
    if (props.simple && newVal) {
      inputValue.value = newVal.toString()
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
