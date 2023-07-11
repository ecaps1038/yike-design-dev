<template>
  <button :class="ykButtonClass" :disabled="disabled || loading">
    <template>
      <svg viewBox="25 25 50 50" v-show="loading">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </template>
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
import { buttonProps } from './button'
import '../style'

const props = defineProps(buttonProps)

const ykButtonClass = computed(() => {
  return {
    'yk-button': true,
    'yk-button--long': props.long,
    'yk-button--disabled': props.disabled || props.loading,
    [`yk-button--${props.status}`]: props.status,
    [`yk-button--${props.type}`]: props.type,
    [`yk-button--${props.size}`]: props.size,
    [`yk-button--${props.round}`]: props.round,
  }
})
</script>
./button
