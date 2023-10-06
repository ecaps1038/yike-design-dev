<template>
  <YkPopover
    v-bind="{ ...props, ...$attrs, open, trigger }"
    :class="bem()"
    @update:open="changeOpen"
  >
    <template #title>
      <slot name="title"></slot>
    </template>

    <template #content>
      <slot name="content">
        <div :class="bem('content')">{{ content }}</div>
      </slot>

      <div :class="bem('button-group')">
        <YkButton
          v-if="showCancel"
          size="s"
          type="secondary"
          v-bind="{ ...props.cancelButtonProps }"
          :loading="cancelLoading"
          @click="cancel"
        >
          {{ cancelText }}
        </YkButton>
        <YkButton
          size="s"
          v-bind="{ ...props.okButtonProps }"
          :loading="okLoading"
          @click="confirm"
        >
          {{ okText }}
        </YkButton>
      </div>
    </template>

    <DefaultProps />
  </YkPopover>
</template>

<script setup lang="ts">
import { PopconfirmProps, PopconfirmEmit } from './popconfirm'
import { createCssScope } from '../../utils'
import { useDefaultSlots } from '../../tooltip'
import YkPopover from '../../popover'
import YkButton from '../../button'
import { ref, watch, toRaw } from 'vue'
import type { Ref } from 'vue'

defineOptions({
  name: 'YkPopconfirm',
})

const bem = createCssScope('popconfirm')
const DefaultProps = useDefaultSlots()

const props = withDefaults(defineProps<PopconfirmProps>(), {
  cancelText: '取消',
  okText: '确认',
  showCancel: true,
  arrow: true,
  content: 'hello YkPopconfirm',
  open: false,
})

const emit = defineEmits<PopconfirmEmit>()

// 气泡状态控制
const open = ref(toRaw(props).open)
watch(open, (show) => emit('update:open', show))
watch(
  () => props.open,
  (bool) => (open.value = bool),
)
function changeOpen(e: boolean) {
  open.value = e
  emit('update:open', e)
}

// 用户点击确认取消按钮 反馈处理
const trigger = ref(toRaw(props).trigger)
const cancelLoading = ref(false)
const okLoading = ref(false)

let promise: Promise<boolean> | void | null
// 点击确认取消按钮 展示异步加载状态
async function loading(loadingType: Ref<boolean>) {
  if (promise instanceof Promise) {
    loadingType.value = true
    trigger.value = 'none'
    await promise
    setTimeout(() => {
      promise = null
      loadingType.value = false
      trigger.value = props.trigger
    })
  }
  open.value = false
}
// 取消按钮处理逻辑
async function cancel() {
  if (promise) return
  promise = props.onCancel && props.onCancel()
  loading(cancelLoading)
}
// 确认按钮处理逻辑
async function confirm() {
  if (promise) return
  promise = props.onConfirm && props.onConfirm()
  loading(okLoading)
}
</script>
