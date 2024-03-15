<template>
  <button
    :class="[
      bem([type, status, shape, size], {
        loading: loading,
        long: long,
        disabled: disabled,
      }),
    ]"
    :disabled="disabled || loading"
  >
    <yk-spinner v-if="loading" :size="getSize(size)" />
    <span v-if="$slots.icon" :class="icon">
      <slot name="icon" />
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSize } from './utils'
import { createCssScope } from '../../utils'
import YkSpinner from '../../spinner'
import { ButtonProps } from './button'
import '../style'

defineOptions({
  name: 'YkButton',
})

const bem = createCssScope('button')
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'l',
  shape: 'default',
  long: false,
  loading: false,
  disabled: false,
})

const icon = computed(() => {
  return {
    'yk-button__icon': props.shape != 'circle' && props.shape != 'square',
  }
})
</script>
