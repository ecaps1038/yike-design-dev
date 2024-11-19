<template>
  <span :style="outerStyle" :class="bem()">
    <IconLoadingOutline :style="circleStyle" />
  </span>
</template>

<script setup lang="ts">
import { SpinnerProps, resolveSize, resolveColor } from './spinner'
import { createCssScope } from '../../utils'
import { computed, ref } from 'vue'
import '../style'

defineOptions({
  name: 'YkSpinner',
})

const bem = createCssScope('spinner')
const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 16,
  color: 'primary',
})
const computedSize = ref(resolveSize(props.size))

const outerStyle = computed(() => {
  return {
    width: `${computedSize.value}px`,
    height: `${computedSize.value}px`,
  }
})

const circleStyle = computed(() => {
  return {
    color: resolveColor(props.color),
    width: `${computedSize.value}px`,
    height: `${computedSize.value}px`,
  }
})
</script>
