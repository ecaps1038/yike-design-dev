<template>
  <div
    ref="dropdownRef"
    :class="[bem(), getDisabled]"
    @mouseenter="handleHover"
    @mouseleave="handleHover"
  >
    <div
      ref="titleRef"
      :class="bem('title')"
      @[getTrigger].prevent="toggleShowMenu"
    >
      <YkButton v-if="label" :size="size || 'l'" :type="type || 'secondary'">
        {{ label }}
        <div ref="iconRef" :class="bem('icon')">
          <IconDownOutline v-if="isDownIcon" />
          <IconUpOutline v-else />
        </div>
      </YkButton>
      <slot v-else name="title"></slot>
    </div>

    <Transition name="modal">
      <div
        v-show="isOpen"
        ref="contentRef"
        :class="[bem('content'), position]"
        :style="getMenuPosition(position)"
      >
        <div :class="bem('menu')">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { IconDownOutline, IconUpOutline } from '../../svg-icon'
import type { DropdownProps } from './dropdown'
import { createCssScope } from '../../utils/bem'
import { ref, toRefs, onMounted, watch, provide } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineOptions({
  name: 'YkDropdown',
})

const emit = defineEmits<{
  select: [value: string | number | object]
  activate: [value: boolean]
}>()

const bem = createCssScope('dropdown')
const props = withDefaults(defineProps<DropdownProps>(), {
  label: '',
  type: 'secondary',
  size: 'l',
  trigger: 'hover',
  position: 'bottom',
  disabled: false,
})

// prettier-ignore
const {
  label,
  type,
  size,
  trigger,
  position,
  disabled,
} = toRefs(props)

// handle data
const isHover = trigger.value === 'hover'
const isDownIcon = position.value.at(0) === 'b'
const getDisabled = disabled.value ? 'disabled' : false
const getTrigger = isHover ? '' : trigger

// refs
const dropH = ref(0)
const isOpen = ref(false)
const selectedValue = ref<any>(null)
const titleRef = ref<HTMLElement>()
const iconRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()

// Provides
provide('selectedValue', selectedValue)
provide('isOpen', isOpen)
provide('size', size)

onMounted(() => {
  dropH.value = titleRef.value?.clientHeight || 0
  // When the dropdown loses focus, close the dropdown menu
  if (trigger.value !== 'hover') {
    onClickOutside(dropdownRef, () => (isOpen.value = false))
  }

  watch(
    [() => isOpen.value, () => selectedValue.value],
    ([newShowMenu, newSelectedValue], [oldShowMenu, oldSelectedValue]) => {
      if (newShowMenu !== oldShowMenu) {
        emit('activate', newShowMenu)
      }

      if (newSelectedValue !== oldSelectedValue) {
        emit('select', newSelectedValue)
      }

      if (iconRef.value) {
        if (newShowMenu) {
          iconRef.value.style.transform = 'rotate(180deg)'
        } else {
          iconRef.value.style.transform = 'rotate(0deg)'
        }
      }
    },
  )
})

function getMenuPosition(position: string) {
  switch (position) {
    case 'top':
    case 'tl':
    case 'tr':
      return {
        top: 'auto',
        bottom: `${dropH.value}px`,
      }
    default:
      return {
        top: `${dropH.value}px`,
        bottom: 'auto',
      }
  }
}

const handleHover = debounce(handleHoverHelp, 100)
function handleHoverHelp(evt: MouseEvent) {
  if (!getDisabled && trigger.value === 'hover') {
    if (evt.type === 'mouseenter') {
      isOpen.value = true
    }
    if (evt.type === 'mouseleave') {
      isOpen.value = false
    }
  }
}

function toggleShowMenu() {
  if (getDisabled && trigger.value === 'hover') return
  isOpen.value = !isOpen.value
}

function debounce(
  func: (evt: MouseEvent) => void,
  delay: number,
): (evt: MouseEvent) => void {
  // eslint-disable-next-line no-undef
  let timeoutId: NodeJS.Timeout | null

  return function (evt: MouseEvent) {
    clearTimeout(timeoutId!)

    timeoutId = setTimeout(() => {
      func(evt)
    }, delay)
  }
}
</script>
