<template>
  <Tooltip v-bind="{ ...$props, ...$attrs }" :class="bem()">
    <template #content>
      <slot name="popover">
        <slot name="title">
          <div :class="bem('title')">{{ title }}</div>
        </slot>
        <slot name="content">
          <div :class="bem('content')">{{ content }}</div>
        </slot>
      </slot>
    </template>

    <DefaultSlot></DefaultSlot>
  </Tooltip>
</template>

<script setup lang="ts">
import Tooltip, { useDefaultSlots } from '../../tooltip'
import { createCssScope } from '../../utils'
import { PopoverProps } from './popover'
import '../style'

defineOptions({
  name: 'YkPopover',
})

withDefaults(defineProps<PopoverProps>(), {
  title: '标题',
  content: 'popover 组件',
  arrow: true,
})

const bem = createCssScope('popover')
const DefaultSlot = useDefaultSlots()
</script>
