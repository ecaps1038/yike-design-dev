<template>
  <div class="yk-tooltip">
    <transition name="show">
      <template v-if="!(destroyTooltipOnHide && !showTooltip)">
        <div
          v-show="showTooltip"
          ref="tooltip"
          class="yk-tooltip-content"
          :class="className"
          :style="[overlayStyle, { zIndex }]"
        >
          <slot name="content">{{ title }}</slot>
        </div>
      </template>
    </transition>
    <DefaultSlot
      @focus="onFocus"
      @mouseover="onEnter"
      @mouseleave="onLeave"
      @click.stop="onClick"
      @contextmenu.prevent="onOpenMenu"
    ></DefaultSlot>
  </div>
</template>

<script setup lang="ts">
import type { TooltipProps, TooltipEmit } from './tooltip'
import '../style/index.less'
import { computed, ref, watch } from 'vue'
import { useEventListener, usePlacement, useDefaultSlots } from './hooks'
defineOptions({
  name: 'YkTooltip',
})

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

// 打开气泡
function openTooltip() {
  setTimeout(() => {
    showTooltip.value = true
    emit('openChange', showTooltip.value)
  }, props.openDelay)
}
// 关闭气泡
function closeTooltip() {
  setTimeout(() => {
    showTooltip.value = false
    emit('openChange', showTooltip.value)
  }, props.closeDelay)
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
  return {
    [`yk-tooltip-${autoAdjustOverflow ? placement.join('') : props.placement}`]:
      true,
    [overlayClassName || '']: true,
  }
})
</script>
