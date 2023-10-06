<template>
  <div :class="[bem(), _disabled]">
    <yk-tooltip
      v-model:open="isOpen"
      :arrow="arrow"
      :trigger="trigger"
      :animation="animation"
      :placement="placement"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :overlay-class="overlayClass"
      :overlay-style="overlayStyle"
      :z-index="zIndex"
    >
      <div :class="bem('title')">
        <yk-button v-if="title" :size="size" :type="type">
          {{ title }}
          <div ref="iconRef" :class="bem('icon')">
            <icon-down-outline />
          </div>
        </yk-button>
        <slot v-else name="title"></slot>
      </div>

      <template #content>
        <slot></slot>
      </template>
    </yk-tooltip>
  </div>
</template>

<script setup lang="ts">
import YkButton from '../../button'
import YkTooltip from '../../tooltip'
import { IconDownOutline } from '../../svg-icon'
import { createCssScope } from '../../utils'
import { ref, provide, watch } from 'vue'
import type { DropdownProps, DropdownEmits } from './dropdown'
import '../style'

defineOptions({
  name: 'YkDropdown',
})

const bem = createCssScope('dropdown')
const emit = defineEmits<DropdownEmits>()

// prettier-ignore
const props = withDefaults(
  defineProps<DropdownProps>(), 
  {
    title: '',
    size: 'l',
    open: false,
    arrow: true,
    disabled: false,
    type: 'secondary',
    placement: 'bottom',
    trigger: 'hover',
    animation: 'downBottom',
    openDelay: 0,
    closeDelay: 80,
    overlayClass: '',
    overlayStyle: () => ({}),
    zIndex: 1,
  }
)

// refs
// prettier-ignore
const selectedValue = ref<any>(null)
const isOpen = ref(props.open)
const iconRef = ref<HTMLElement>()
const _disabled = props.disabled ? 'disabled' : false

provide('option', {
  ...props,
  isOpen,
  selectedValue,
})

watch(selectedValue, (newSelected, oldSelected) => {
  if (_disabled) return
  if (newSelected !== oldSelected) {
    emit('selected', newSelected)
  }
})

watch(isOpen, (newVal) => {
  const deg = newVal ? '180deg' : '0deg'
  const iconNode = iconRef.value

  iconNode && (iconNode.style.transform = `rotate(${deg})`)
  emit('visibleChange', newVal)
})
</script>
