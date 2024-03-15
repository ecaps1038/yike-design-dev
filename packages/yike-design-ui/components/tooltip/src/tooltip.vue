<template>
  <div ref="tooltipRef" :class="bem()">
    <DefaultSlot
      @focus="handleFocus"
      @mouseenter="handleHover"
      @mouseleave="handleHover"
      @click.stop="handleClick"
      @contextmenu.prevent="handleContextmenu"
    ></DefaultSlot>

    <transition :name="animation">
      <template v-if="!(destroyTooltipOnHide && !showPopper)">
        <div
          v-show="showPopper"
          ref="popperRef"
          :class="getPlacementClassName"
          :style="[overlayStyle, { zIndex }]"
          @click.stop
          @mouseenter="openPopper"
          @mouseleave="handleHover"
        >
          <div v-if="arrow" :class="bem('arrow')"></div>
          <slot name="content">{{ title }}</slot>
        </div>
      </template>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { TooltipProps, TooltipEmit, Trigger } from './tooltip'
import { usePlacement, useDefaultSlots } from './hooks'
import { createCssScope } from '../../utils'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, toRefs, watch } from 'vue'
import '../style'

defineOptions({
  name: 'YkTooltip',
})

const bem = createCssScope('tooltip')
const emit = defineEmits<TooltipEmit>()
const DefaultSlot = useDefaultSlots()

// prettier-ignore
const props = withDefaults(
  defineProps<TooltipProps>(), {
    title: 'hello',
    open: false,
    arrow: true,
    placement: 'top',
    trigger: 'hover',
    animation: 'show',
    openDelay: 0,
    closeDelay: 300,
    overlayClass: '',
    overlayStyle: () => ({}),
    autoAdjustOverflow: false,
    destroyTooltipOnHide: false,
  }
)

const {
  arrow,
  placement,
  trigger,
  animation,
  openDelay,
  closeDelay,
  overlayClass,
  overlayStyle,
  autoAdjustOverflow,
  destroyTooltipOnHide,
} = toRefs(props)

const tooltipRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()
const showPopper = ref(props.open)

watch(
  () => props.open,
  (newVal) => (showPopper.value = newVal),
)
watch(showPopper, (newVal) => emit('update:open', newVal))

// 计算气泡方位类名
const baseClass = bem('content')
const placements = usePlacement(popperRef, placement.value)
const getPlacementClassName = computed(() => {
  const classNames = [
    baseClass,
    overlayClass.value,
    autoAdjustOverflow.value || placement.value,
  ]

  if (autoAdjustOverflow.value) {
    classNames.push(placements.join(''))
  }

  return classNames
})

/** 切换 Popper 组件的可见性状态，带有延迟效果。 */
const togglePopperVisibility = (() => {
  let timer: any

  return function (isOpen: boolean) {
    clearTimeout(timer)

    if (trigger.value === 'none' || showPopper.value === isOpen) return
    const delay = isOpen ? openDelay : closeDelay

    timer = setTimeout(() => {
      showPopper.value = isOpen
      emit('openChange', showPopper.value)
    }, delay.value)
  }
})()

const openPopper = () => togglePopperVisibility(true)
const closePopper = () => togglePopperVisibility(false)

onClickOutside(tooltipRef, () => {
  if (showPopper.value) closePopper()
})

function handleHover(evt: MouseEvent) {
  if (!checkTrigger('hover')) return
  if (evt.type === 'mouseenter') openPopper()
  else closePopper()
}

function handleClick() {
  if (!checkTrigger('click')) return
  if (showPopper.value) closePopper()
  else openPopper()
}

function handleContextmenu() {
  if (checkTrigger('contextmenu')) openPopper()
}

function handleFocus() {
  if (checkTrigger('focus')) openPopper()
}

/**
 * 检查 trigger 类型
 * @param {Trigger} type - 要检查的类型
 */
function checkTrigger(type: Trigger) {
  return trigger.value === type || trigger.value.includes(type)
}
</script>
