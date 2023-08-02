<template>
  <div :class="[bem(), getDisabled]">
    <Tooltip
      :arrow="arrow"
      :trigger="trigger"
      :z-index="zIndex"
      :placement="placement"
      :close-delay="closeDelay"
      :open-delay="openDelay"
      :overlay-style="overlayStyle"
      :overlay-class-name="overlayClassName"
      @open-change="handleOpenChange"
    >
      <div :class="bem('title')">
        <YkButton v-if="title" :size="size || 'l'" :type="type || 'secondary'">
          {{ title }}
          <div ref="iconRef" :class="bem('icon')">
            <IconDownOutline />
          </div>
        </YkButton>
        <slot v-else name="title"></slot>
      </div>

      <template #content>
        <slot></slot>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { IconDownOutline } from '../../svg-icon'
import Tooltip from '../../tooltip/src/tooltip.vue'
import type { DropdownProps } from './dropdown'
import { createCssScope } from '../../utils/bem'
import { ref, toRefs, provide, watch } from 'vue'

defineOptions({
  name: 'YkDropdown',
})

const emit = defineEmits<{
  selected: [value: string | number | object]
  visibleChange: [value: boolean]
}>()

const bem = createCssScope('dropdown')
const props = withDefaults(defineProps<DropdownProps>(), {
  title: '',
  trigger: 'hover',
  type: 'secondary',
  placement: 'bottom',
  size: 'l',
  zIndex: 1,
  open: false,
  openDelay: 80,
  closeDelay: 80,
  disabled: false,
  arrow: true,
  overlayStyle: () => ({}),
  overlayClassName: '',
})

// refs
const { size, trigger, disabled } = toRefs(props)
// open key is readonly, so：
const isOpen = ref(props.open)
const selectedValue = ref<any>(null)
const iconRef = ref<HTMLElement>()
const getDisabled = disabled.value ? 'disabled' : false

provide('selectedValue', selectedValue)
provide('isOpen', isOpen)
provide('size', size)

watch(
  () => selectedValue.value,
  (newSelected, oldSelected) => {
    if (getDisabled) return

    if (newSelected !== oldSelected) {
      emit('selected', newSelected)
    }
  },
)

function handleOpenChange(value: boolean) {
  const iconNode = iconRef.value

  if (iconNode) {
    if (value) {
      iconNode.style.transform = 'rotate(180deg)'
    } else {
      iconNode.style.transform = 'rotate(0deg)'
    }
  }
  emit('visibleChange', value)
}
</script>
