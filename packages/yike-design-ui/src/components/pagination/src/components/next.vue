<template>
  <button
    :class="
      nsNext({
        s: props.size === 's',
        m: props.size === 'm',
        l: props.size === 'l',
        xl: props.size === 'xl',
        disabled: props.disabled,
      })
    "
    @click="handleClick"
  >
    <IconRightOutline />
  </button>
</template>

<script lang="ts" setup>
import { createCssScope } from '../../../utils/bem'
import { NextProps, NextEmits } from './next'

defineOptions({
  name: 'YkPaginationNext',
})

const props = defineProps(NextProps)
const emits = defineEmits<NextEmits>()

const nsNext = createCssScope('pagination-next')

const handleClick = () => {
  if (!props.disabled) {
    emits('next')
  }
}
</script>
