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
          <IconReminderFill v-if="type === 'primary'" class="icon-primary" />
          <IconWarningFill
            v-else-if="type === 'warning'"
            class="icon-warning"
          />
          <IconCrossFill v-else-if="type === 'error'" class="icon-error" />
          <IconTickFill v-else-if="type === 'success'" class="icon-success" />
          <IconLoadingOutline
            v-else-if="type === 'loading'"
            class="icon-loading"
          />
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
          <IconCloseOutline />
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
import { YkButton, YkSpace } from '../../../index'
import IconReminderFill from '../../svg-icon/icon-reminder-fill'
import IconWarningFill from '../../svg-icon/icon-warning-fill'
import IconCrossFill from '../../svg-icon/icon-cross-fill'
import IconTickFill from '../../svg-icon/icon-tick-fill'
import IconLoadingOutline from '../../svg-icon/icon-loading-outline'
import IconCloseOutline from '../../svg-icon/icon-close-outline'

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
  handleCancel: () => ({}),
  handleSubmit: () => ({}),
  onClose: () => ({}),
})

const emits = defineEmits(['close'])

let timer = 0

const Style = computed(() => ({
  marginBottom: `${props.space}px`,
  top: `${props.offsetY}px`,
  right: `${props.offsetX}px`,
  zIndex: props.zIndex,
}))
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
