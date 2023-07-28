<script setup lang="ts">
import type { DropdownItemProps } from './dropdown'
import { createCssScope } from '../../../utils/bem'
import { inject, toRefs } from 'vue'
import type { Ref } from 'vue'

defineOptions({
  name: 'YkDropdownItem',
})

const bem = createCssScope('dropdown-item')
const props = withDefaults(defineProps<DropdownItemProps>(), {
  value: '',
  icon: '',
  disabled: false,
})

// Injects
const selectedValue = inject('selectedValue') as Ref<string | number | object>
const isOpen = inject('isOpen') as Ref<boolean>

const { value, icon, disabled } = toRefs(props)
const getDisabled = disabled.value ? 'disabled' : false

function handleDropdownItemClick() {
  if (getDisabled) return

  selectedValue.value = value.value
  isOpen.value = false
}
</script>

<template>
  <div :class="[bem(), getDisabled]" @click="handleDropdownItemClick">
    <yk-icon v-if="icon" :name="icon" style="margin-right: 6px" />
    <slot></slot>
  </div>
</template>
