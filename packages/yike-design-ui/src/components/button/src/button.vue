<template>
  <button
    :class="[
      bem([type, shape, size, status], { disabled: disabled || loading, long }),
    ]"
    :disabled="disabled || loading"
  >
    <svg v-if="loading" viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonProps } from './button'
import { createCssScope } from '../../../utils/bem'
import '../style'

const bem = createCssScope('button')

defineOptions({
  name: 'YKButton',
})

withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'l',
  shape: 'default',
  long: false,
  loading: false,
  disabled: false,
})
</script>
