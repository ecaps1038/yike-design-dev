<template>
  <component :is="wrapDecoration" :class="textClass">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, toRefs, useSlots } from 'vue'
import { textProps } from './typography'

defineOptions({
  name: 'YkText',
})

const props = withDefaults(defineProps<textProps>(), {
  strong: false,
  type: 'default',
  mark: false,
  underline: false,
  del: false,
})

const { strong, mark, underline, del } = toRefs(props)

const textClass = computed(() => {
  return {
    [`yk-text--${props.type}`]: props.type,
    'yk-text': true,
    'yk-typography': true,
  }
})

const slots = useSlots()

const wrap = (dec: boolean, tag: string) => {
  return dec ? tag : ''
}

const wrapDecoration = computed(() => {
  if (slots && slots.length) {
    return 'div'
  }
  const decorateWrap =
    wrap(mark.value, 'mark') +
    wrap(underline.value, 'underline') +
    wrap(del.value, 'del') +
    wrap(strong.value, 'strong')
  return decorateWrap || 'span'
})
</script>
