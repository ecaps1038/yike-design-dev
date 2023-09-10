<template>
  <a
    :target="newtab ? '_blank' : undefined"
    :href="disabled || !href ? undefined : href"
    :class="
      bem({
        disabled: disabled,
      })
    "
    @click="onClick"
  >
    <slot />
    <sup v-if="isAnchor">#</sup>
  </a>
</template>
<script setup lang="ts">
import { LinkProps } from './link'
import { createCssScope } from '../../utils/bem'

const bem = createCssScope('link')

defineOptions({
  name: 'YkLink',
})

const props = withDefaults(defineProps<LinkProps>(), {
  newtab: false,
  href: '/',
  disabled: false,
})

const isAnchor = props.href.startsWith('#')
const emits = defineEmits(['click'])

const onClick = () => {
  if (!props.disabled) {
    emits('click')
  }
  return
}
</script>
