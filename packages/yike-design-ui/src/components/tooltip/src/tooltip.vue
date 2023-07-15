<template>
  <div class="yk-tooltip">
    <transition name="show">
      <div v-show="showTooltip" class="yk-tooltip-content" :class="className">
        {{ title }}
      </div>
    </transition>

    <DefalutSolt
      @focus="onFocus"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @click="onClick"
      @blur="onBlur"
      @contextmenu="onOpenMenu"
    ></DefalutSolt>
  </div>
</template>

<script setup lang="ts">
import type { ToolTipProps, TooltipEmit } from './tooltip'
import '../style/index.less'
import { computed, useSlots, defineComponent, h, ref, watch } from 'vue'
defineOptions({
  name: 'YkTooltip',
})
// props 属性定义
const props = withDefaults(defineProps<ToolTipProps>(), {
  title: 'hello',
  placement: 'left',
  trigger: 'hover',
  open: false,
})
// 自定义事件
const emit = defineEmits<TooltipEmit>()

// 插槽元素属性 属性处理
const slots = useSlots()
const DefalutSolt = defineComponent((componentProps, context) => {
  return () => {
    const VNodes = slots.default ? slots.default() : [h('span', {}, 'tooltip')]
    VNodes[0] = h(VNodes[0], { ...componentProps, ...context.attrs })
    return h('div', {}, VNodes)
  }
})

// 组件控制和事件控制展示气泡双向绑定
const showTooltip = ref(props.open)
watch(showTooltip, (show) => emit('update:open', show))
watch(
  () => props.open,
  (open) => (showTooltip.value = open),
)
// 展示隐藏 气泡 事件函数
function onEnter() {
  if (props.trigger === 'hover' || props.trigger.includes('hover'))
    showTooltip.value = true
}
function onLeave() {
  if (props.trigger === 'hover' || props.trigger.includes('hover'))
    showTooltip.value = false
}
function onClick() {
  if (props.trigger === 'click' || props.trigger.includes('click'))
    showTooltip.value = !showTooltip.value
}
function onOpenMenu() {
  if (props.trigger === 'contextMenu' || props.trigger.includes('contextMenu'))
    showTooltip.value = true
}
function onFocus() {
  if (props.trigger === 'focus' || props.trigger.includes('focus'))
    showTooltip.value = true
}
function onBlur() {
  if (props.trigger === 'focus' || props.trigger.includes('focus'))
    showTooltip.value = false
}

// 类名计算
let className = computed(() => {
  return {
    [`yk-tooltip-${props.placement}`]: true,
  }
})
</script>
