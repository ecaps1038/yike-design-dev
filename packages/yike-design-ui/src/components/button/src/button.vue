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

<script lang="ts">
export default {
  name: 'YKButton',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { ButtonProps } from './button'
import { getSize } from './utils'
import { YkSpinner } from '../../../index'

import { createCssScope } from '../../utils/bem'

const bem = createCssScope('button')

defineOptions({
  name: 'YKButton',
})
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
