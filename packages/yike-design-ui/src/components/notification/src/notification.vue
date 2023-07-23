<template>
  <div class="yk-notification" :style="Style">
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
          <div class="content">{{ message }}</div>
        </div>
        <button
          v-if="props.closable"
          type="button"
          :class="`yk-notification-close-icon`"
          @click="handleClose"
        >
          <slot name="closeElement">
            <yk-icon name="yk-cha"></yk-icon>
          </slot>
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
import { onMounted, computed } from 'vue'
import '../style'
import { YkIcon } from '../../../index'
defineOptions({
  name: 'YkNotification',
})
const props = withDefaults(defineProps<NotificationProps>(), {
  title: 'Title',
  message: '',
  type: 'primary',
  duration: 3000,
  closable: true,
  showFooterBtn: false,
  showIcon: true,
  space: 24,
  offsetY: 24,
  offsetX: 24,
  zIndex: 2001,
  handleCancel: () => ({}),
  handleOK: () => ({}),
  onClose: () => ({}),
})

const emits = defineEmits(['close'])

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
  if (!props.duration) return
  setTimeout(() => {
    close()
  }, props.duration)
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
  props.handleOK && props.handleOK()
}

onMounted(() => {
  startTimer()
})
</script>
