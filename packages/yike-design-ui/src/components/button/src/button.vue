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
    <svg v-if="loading" viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>

    <span v-if="isIcon" ref="$icon" :class="icon">
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
import { ref, onMounted, computed } from 'vue'
import { ButtonProps } from './button'

import { createCssScope } from '../../utils/bem'

const $icon = ref<HTMLSpanElement>()
const isIcon = ref<boolean>(true)

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
onMounted(() => {
  if ($icon.value)
    if (!$icon.value.innerHTML) {
      isIcon.value = false
    }
})
</script>
