<template>
  <button
    :class="[bem([type, status, shape, size], { loading, long, disabled })]"
    :disabled="disabled || loading"
  >
    <yk-spinner v-if="loading" :size="iconSize" />
    <span v-if="$slots.icon" :class="iconClassName">
      <slot name="icon" />
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import YkSpinner from '../../spinner'
import { computed } from 'vue'
import { ButtonProps } from './button'
import { createCssScope } from '../../utils'
import '../style'

defineOptions({ name: 'YkButton' })

const bem = createCssScope('button')
// prettier-ignore
const props = withDefaults(
  defineProps<ButtonProps>(), 
  {
    long: false,
    loading: false,
    disabled: false,
  }
)

const iconSize = computed(() => {
  const sizeMap = { s: 12, m: 14, l: 14, xl: 16 }
  return sizeMap[props.size!]
})

const iconClassName = computed(() => {
  if (props.shape === 'circle' || props.shape === 'square') return
  return 'yk-button__icon'
})
</script>
