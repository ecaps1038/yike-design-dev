<template>
  <div>
    <div :class="bem()" :style="Style">
      <IconReminderFill v-if="type === 'primary'" class="icon-primary" />
      <IconWarningFill v-else-if="type === 'warning'" class="icon-warning" />
      <IconCrossFill v-else-if="type === 'error'" class="icon-error" />
      <IconTickFill v-else-if="type === 'success'" class="icon-success" />
      <IconLoadingOutline v-else-if="type === 'loading'" class="icon-loading" />
      <span class="text">
        <component :is="render(props.message)" />
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MessageProps } from './message'
import { ref, onMounted, computed } from 'vue'
import { createCssScope, render } from '../../utils'

import IconReminderFill from '../../svg-icon/icon-reminder-fill'
import IconWarningFill from '../../svg-icon/icon-warning-fill'
import IconCrossFill from '../../svg-icon/icon-cross-fill'
import IconTickFill from '../../svg-icon/icon-tick-fill'
import IconLoadingOutline from '../../svg-icon/icon-loading-outline'

import '../style'

const bem = createCssScope('message')

defineOptions({
  name: 'YkMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  message: '',
  type: 'success',
  duration: 3000,
  offset: 12,
  zIndex: 100,
  onClose: () => ({}),
})

const emits = defineEmits(['close'])

const Style = computed(() => ({
  marginBottom: `${props.offset}px`,
  zIndex: props.zIndex,
}))
const isShow = ref(false)
const startTimer = () => {
  if (!props.duration || props.type === 'loading') {
    return
  }
  setTimeout(() => {
    close()
  }, props.duration)
}

const close = () => {
  emits('close')
  isShow.value = false
}

onMounted(() => {
  startTimer()
  isShow.value = true
})
</script>
