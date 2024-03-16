<template>
  <div v-if="!submenu" :class="getClassName" @click="handleClick">
    <slot></slot>
  </div>
  <div v-else :class="getClassName">
    <yk-tooltip
      :arrow="arrow"
      :trigger="trigger"
      :animation="_animation"
      :placement="_placement"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :overlay-class="overlayClass"
      :overlay-style="getOverlayStyle"
      :z-index="zIndex"
    >
      <div :class="[bem('title')]">
        <slot name="title"></slot>
      </div>
      <template #content><slot></slot></template>
    </yk-tooltip>
  </div>
</template>

<script setup lang="ts">
import YkTooltip from '../../tooltip'
import type { DropdownItemProps, DropdownOption } from './dropdown'
import { createCssScope } from '../../utils'
import { inject, computed, StyleValue } from 'vue'

defineOptions({
  name: 'YkDropdownItem',
})

const bem = createCssScope('dropdown-item')
// prettier-ignore
const props = withDefaults(
  defineProps<DropdownItemProps>(),
  {
    value: '',
    disabled: false,
    submenu: false,
    dir: 'right',
    animation: ''
  }
)

// Injects
const {
  selectedValue,
  isOpen,
  size,
  arrow,
  trigger,
  openDelay,
  closeDelay,
  overlayClass,
  overlayStyle,
  zIndex,
} = inject('option') as DropdownOption

const { value: dropdownItemValue, disabled, animation, dir } = props
const animationOption = {
  left: 'downLeft',
  right: 'downRight',
}
const placementOption = {
  left: 'leftTop',
  right: 'rightTop',
}

const _disabled = disabled ? 'disabled' : false
const _animation = animation || animationOption[dir]
const _placement = placementOption[dir] as DropdownOption['placement']

const getClassName = computed(() => {
  return [bem(), _disabled, `size-${size}`]
})

const getOverlayStyle = computed(() => {
  return [
    overlayStyle,
    {
      top: '-4px',
      [dir]: '-8px',
    },
  ] as StyleValue
})

function handleClick() {
  if (_disabled) return

  isOpen.value = false
  selectedValue.value = dropdownItemValue
}
</script>
