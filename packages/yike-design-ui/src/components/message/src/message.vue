<template>
  <div>
    <div :class="bem()" :style="Style">
      <component
        :is="statusIconName"
        :class="`icon-${props.type} message-icon`"
      />
      <span class="text">{{ message }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MessageProps } from './message'
import { ref, onMounted, computed } from 'vue'
import { createCssScope } from '../../utils/bem'
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

const statusIconName = computed(() => {
  return iconStatusMap[props.type]
})
const Style = computed(() => ({
  marginBottom: `${props.offset}px`,
  zIndex: props.zIndex,
}))
const iconStatusMap = {
  primary: 'IconReminderFill',
  warning: 'IconWarningFill',
  error: 'IconCrossFill',
  success: 'IconTickFill',
  loading: 'IconLoadingOutline',
}
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
../../utils/bem
