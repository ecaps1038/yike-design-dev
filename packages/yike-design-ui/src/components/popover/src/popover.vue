<template>
  <div class="yk-popover">
    <Tooltip v-bind="{ ...$props, ...$attrs }" class="yk-popover-theme">
      <template #content>
        <div class="yk-popover-popover">
          <slot name="popover">
            <slot name="title">
              <h3 class="yk-popover-title">{{ title }}</h3>
            </slot>
            <slot name="content">
              <div class="yk-popover-content">{{ content }}</div>
            </slot>
          </slot>
        </div>
      </template>

      <DefaultSlot></DefaultSlot>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import Tooltip, { useDefaultSlots } from '../../tooltip'
import { PopoverProps } from './popover'
import '../style'

defineOptions({
  name: 'YkPopover',
})
const DefaultSlot = useDefaultSlots()

withDefaults(defineProps<PopoverProps>(), {
  title: '标题',
  content: 'popover 组件',
})
</script>
