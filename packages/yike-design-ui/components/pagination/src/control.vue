<template>
  <div :class="bem({ disabled })"><component :is="icon" /></div>
</template>

<script setup lang="ts">
import { IconLeftOutline, IconRightOutline } from '../../svg-icon'
import { createCssScope } from '../../utils'
import type { Component, Ref } from 'vue'
import { computed, inject } from 'vue'

interface Props {
  icon: 'prev' | 'next'
  prevIcon?: Component
  nextIcon?: Component
}

const bem = createCssScope('pagination-control')
const { isFirstPage, isLastPage } = inject('info') as Record<string, Ref>

// prettier-ignore
const props = withDefaults(
  defineProps<Props>(),
  {
    disabled: false,
    prevIcon: IconLeftOutline,
    nextIcon: IconRightOutline
  }
)

const disabled = computed(() => {
  if (props.icon === 'prev' && isFirstPage.value) return true
  if (props.icon === 'next' && isLastPage.value) return true
  return false
})

const icon = computed(() => {
  if (props.icon === 'prev') return props.prevIcon
  return props.nextIcon
})
</script>
