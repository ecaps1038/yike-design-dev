<template>
  <div :class="bem()">
    <transition name="show">
      <template v-if="!(destroyTooltipOnHide && !showTooltip)">
        <div
          v-show="showTooltip"
          ref="tooltip"
          :class="className"
          :style="[overlayStyle, { zIndex }]"
          @click.stop
          @mouseenter="openTooltip"
          @mouseleave="onLeave"
        >
          <div v-if="arrow" :class="bem('arrow')"></div>
          <slot name="content">{{ title }}</slot>
        </div>
      </template>
    </transition>
    <DefaultSlot
      @focus="onFocus"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @click.stop="onClick"
      @contextmenu.prevent="onOpenMenu"
    ></DefaultSlot>
  </div>
</template>

<script setup lang="ts">
import type { TooltipProps, TooltipEmit } from './tooltip'
import { computed, ref, watch } from 'vue'
import { useEventListener, usePlacement, useDefaultSlots } from './hooks'
import { createCssScope } from '../../utils'
import '../style'

defineOptions({
  name: 'YkTooltip',
})

const bem = createCssScope('tooltip')

// props 属性定义
const props = withDefaults(defineProps<TooltipProps>(), {
  title: 'hello tooltip',
  placement: 'top',
  trigger: 'hover',
  open: false,
  openDelay: 0,
  closeDelay: 300,
  autoAdjustOverflow: false,
  overlayStyle: () => ({}),
  destroyTooltipOnHide: false,
  arrow: true,
})

// 自定义事件
const emit = defineEmits<TooltipEmit>()
const tooltip = ref<null | HTMLElement>()

// 使用默认插槽
const DefaultSlot = useDefaultSlots()

// 组件控制和事件控制展示气泡双向绑定
const showTooltip = ref(props.open)
watch(showTooltip, (show) => emit('update:open', show))
watch(
  () => props.open,
  (open) => (showTooltip.value = open),
)

// 修改tooltip 状态
const changeTooltipType = (() => {
  let timer: any
  // 修改tooltip 状态
  return function (openType: boolean, delay: number) {
    clearTimeout(timer)
    if (props.trigger === 'none' || showTooltip.value === openType) return
    timer = setTimeout(() => {
      showTooltip.value = openType
      emit('openChange', showTooltip.value)
    }, delay)
  }
})()

// 打开气泡
function openTooltip() {
  changeTooltipType(true, props.openDelay)
}

// 关闭气泡
function closeTooltip() {
  changeTooltipType(false, props.closeDelay)
}

// 展示隐藏 气泡 事件函数
function onEnter() {
  if (props.trigger === 'hover' || props.trigger.includes('hover'))
    openTooltip()
}
function onLeave() {
  if (props.trigger === 'hover' || props.trigger.includes('hover'))
    closeTooltip()
}
function onClick() {
  if (props.trigger === 'click' || props.trigger.includes('click')) {
    if (showTooltip.value) closeTooltip()
    else openTooltip()
  }
}
function onOpenMenu() {
  if (props.trigger === 'contextMenu' || props.trigger.includes('contextMenu'))
    openTooltip()
}
function onFocus() {
  if (props.trigger === 'focus' || props.trigger.includes('focus'))
    openTooltip()
}

useEventListener('click', () => {
  if (showTooltip.value) closeTooltip()
})

// 计算气泡方位类名
const placement = usePlacement(tooltip, props.placement)

// 类名计算
const className = computed(() => {
  const { autoAdjustOverflow, overlayClassName } = props
  return [
    ...bem('content', {
      [autoAdjustOverflow ? placement.join('') : props.placement]: true,
    }),
    overlayClassName || '',
  ]
})
</script>
