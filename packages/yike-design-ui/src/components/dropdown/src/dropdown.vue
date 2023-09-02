<template>
  <div :class="[bem(), _disabled]">
    <Tooltip
      v-model:open="isOpen"
      :arrow="arrow"
      :trigger="trigger"
      :z-index="zIndex"
      :placement="placement"
      :close-delay="closeDelay"
      :open-delay="openDelay"
      :overlay-style="overlayStyle"
      :overlay-class-name="overlayClassName"
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
import YkButton from '../../button'
import Tooltip from '../../tooltip'
import { IconDownOutline } from '../../svg-icon'
import { createCssScope } from '../../utils'
import { ref, toRefs, provide, watch } from 'vue'
import type { DropdownProps } from './dropdown'
import '../style'

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
const selectedValue = ref<any>(null)
const isOpen = ref(props.open)
const iconRef = ref<HTMLElement>()
const _disabled = disabled.value ? 'disabled' : false

provide('selectedValue', selectedValue)
provide('isOpen', isOpen)
provide('size', size)

watch(
  () => selectedValue.value,
  (newSelected, oldSelected) => {
    if (_disabled) return
    if (newSelected !== oldSelected) {
      emit('selected', newSelected)
    }
  },
)

watch(
  () => isOpen.value,
  (newVal) => {
    const deg = newVal ? '180deg' : '0deg'
    const iconNode = iconRef.value

    iconNode && (iconNode.style.transform = `rotate(${deg})`)
    emit('visibleChange', newVal)
  },
)
</script>
