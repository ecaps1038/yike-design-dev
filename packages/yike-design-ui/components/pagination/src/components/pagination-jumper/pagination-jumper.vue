<template>
  <span :class="cssScope()">
    <span v-if="!simple" :class="cssScope('label')">前往</span>
    <yk-input-number
      v-model="inputValue"
      :size="size"
      :disabled="disabled"
      :min="1"
      :max="totalPages"
      :controls="false"
      @blur="changePage"
      @submit="changePage"
    ></yk-input-number>
    <span v-if="simple" :class="cssScope('separator')">/</span>
    <span v-if="simple" :class="cssScope('total')">{{ totalPages }}</span>
  </span>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import type { JumperProps, JumperEmits } from './pagination-jumper'
import { useCssScope } from '../../utils'
import YkInputNumber from '../../../../input-number'
defineOptions({
  name: 'YkPaginationJumper',
})

const props = defineProps<JumperProps>()
const emits = defineEmits<JumperEmits>()
const cssScope = useCssScope('jumper')
const inputValue = ref<number>(1)

// const isNumber = (val: string) => {
//   return /^[1-9][0-9]*$/.test(val)
// }

const changePage = () => {
  nextTick(() => {
    let page = inputValue.value
    emits('jump', page)
    // if (!props.simple) {
    //   inputValue.value = 1
    // }
  })
}

watch(
  () => props.current,
  (newVal) => {
    if (props.simple && newVal) {
      inputValue.value = newVal
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
