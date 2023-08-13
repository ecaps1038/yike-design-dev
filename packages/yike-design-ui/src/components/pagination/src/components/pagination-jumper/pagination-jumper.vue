<template>
  <span :class="cssScope()">
    <span v-if="!simple" :class="cssScope('label')">前往</span>
    <yk-input v-model:value="inputValue" :size="size"></yk-input>
    <span v-if="simple" :class="cssScope('separator')">/</span>
    <span v-if="simple" :class="cssScope('total')">{{ total }}</span>
  </span>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { JumperProps } from './pagination-jumper'
import { useCssScope } from '../../utils'
import { YkInput } from '../../../../input'

const props = defineProps<JumperProps>()
const cssScope = useCssScope('jumper')
const inputValue = ref<string>('')

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
