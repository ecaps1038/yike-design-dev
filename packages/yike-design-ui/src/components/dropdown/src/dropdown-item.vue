<template>
  <div :class="[bem(), _disabled, `size-${size}`]" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { DropdownItemProps } from './dropdown'
import { createCssScope } from '../../utils'
import { inject, toRefs } from 'vue'
import type { Ref } from 'vue'

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
  }
)

// Injects
const selectedValue = inject('selectedValue') as Ref<string | number | object>
const isOpen = inject('isOpen') as Ref<boolean>
const size = inject('size')

const { value, disabled } = toRefs(props)
const _disabled = disabled.value ? 'disabled' : false

function handleClick() {
  if (_disabled) return

  isOpen.value = false
  selectedValue.value = value.value
}
</script>
