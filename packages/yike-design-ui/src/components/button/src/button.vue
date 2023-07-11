<template>
  <button :class="ykButtonClass" :disabled="disabled || loading">
    <svg viewBox="25 25 50 50" v-if="loading">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
    <slot name="icon" />
    <slot />
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
import '../style'

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'l',
  shape: 'round',
  long: false,
  loading: false,
  disabled: false,
})

const ykButtonClass = computed(() => {
  return {
    'yk-button': true,
    'yk-button--loading': props.loading,
    'yk-button--long': props.long,
    'yk-button--disabled': props.disabled || props.loading,
    [`yk-button--${props.status}`]: props.status,
    [`yk-button--${props.type}`]: props.type,
    [`yk-button--${props.size}`]: props.size,
    [`yk-button--${props.shape}`]: props.shape,
  }
})
</script>
./button
