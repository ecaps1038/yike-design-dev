<template>
  <button
    :class="
      nsPrev({
        s: props.size === 's',
        m: props.size === 'm',
        l: props.size === 'l',
        xl: props.size === 'xl',
        disabled: props.disabled,
      })
    "
    @click="handleClick"
  >
    <IconLeftOutline />
  </button>
</template>

<script lang="ts" setup>
import { createCssScope } from '../../../utils/bem'

import { PrevProps, PrevEmits } from './prev'

defineOptions({
  name: 'YkPaginationPrev',
})

const props = defineProps(PrevProps)
const emits = defineEmits<PrevEmits>()

const nsPrev = createCssScope('pagination-prev')

const handleClick = () => {
  if (!props.disabled) {
    emits('prev')
  }
}
</script>
