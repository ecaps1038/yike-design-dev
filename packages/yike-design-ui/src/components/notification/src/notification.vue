<template>
  <div
    class="yk-notification"
    :style="Style"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div class="notification-container">
      <div class="notification-body">
        <div v-if="props.showIcon" class="iconDiv">
          <YkIcon
            :name="statusIconName"
            :class="`icon-${props.type} notification-icon`"
          ></YkIcon>
        </div>
        <div>
          <div class="title-text">{{ title }}</div>
          <div class="content">
            <p v-if="!dangaurslyUseHtmlString">{{ realMessgae }}</p>
            <p v-else v-html="realMessgae" />
          </div>
        </div>
        <button
          v-if="props.closable"
          type="button"
          :class="`yk-notification-close-icon`"
          @click="handleClose"
        >
          <yk-icon name="yk-cha"></yk-icon>
        </button>
      </div>
      <yk-space v-if="props.showFooterBtn" class="notification-footer">
        <yk-button type="secondary" @click="clickCancel">取消</yk-button>
        <yk-button @click="clickOK">确定</yk-button>
      </yk-space>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NotificationProps } from './notification'
import { onMounted, computed, VNode, isVNode, createVNode, render } from 'vue'
import '../style'
import { YkIcon } from '../../../index'
defineOptions({
  name: 'YkNotification',
})
const props = withDefaults(defineProps<NotificationProps>(), {
  title: 'Title',
  message: '',
  type: 'primary',
  duration: 4500,
  closable: true,
  showFooterBtn: false,
  showIcon: true,
  space: 24,
  offsetY: 24,
  offsetX: 24,
  zIndex: 2001,
  dangaurslyUseHtmlString: false,
  handleCancel: () => ({}),
  handleSubmit: () => ({}),
  onClose: () => ({}),
})

const realMessgae: string | VNode = (() => {
  if (props.dangaurslyUseHtmlString && isVNode(props.message)) {
    const vm = createVNode(props.message)
    const container = document.createElement('div')
    render(vm, container)
    return container.innerHTML
  }
  return props.message
})()

const emits = defineEmits(['close'])

let timer = 0

const statusIconName = computed(() => {
  return iconStatusMap[props.type]
})
const Style = computed(() => ({
  marginBottom: `${props.space}px`,
  top: `${props.offsetY}px`,
  right: `${props.offsetX}px`,
  zIndex: props.zIndex,
}))
const iconStatusMap = {
  primary: 'yike-tixing',
  warning: 'yike-jinggao',
  error: 'yike-cha',
  success: 'yike-gou',
}
function startTimer() {
  if (props.duration <= 0) return
  timer = Number(
    setTimeout(() => {
      close()
    }, props.duration),
  )
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = 0
  }
}

function close() {
  emits('close')
}

function handleClose() {
  close()
}

function clickCancel() {
  props.handleCancel && props.handleCancel()
}

function clickOK() {
  props.handleSubmit && props.handleSubmit()
}

onMounted(() => {
  startTimer()
})
</script>
