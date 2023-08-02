<template>
  <YkPopover
    v-bind="{ ...$props, ...$attrs, open }"
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
          v-bind="{ ...$props.cancelButtonProps }"
          @click="cancel"
        >
          {{ cancelText }}
        </YkButton>
        <YkButton
          size="s"
          v-bind="{ ...$props.okButtonProps }"
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
import { createCssScope } from '../../utils/bem'
import { useDefaultSlots } from '../../tooltip'
import YkPopover from '../../popover'
import YkButton from '../../button'
import { ref, watch } from 'vue'

const bem = createCssScope('popconfirm')

defineOptions({
  name: 'YkPopconfirm',
})
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

const open = ref(props.open)
watch(open, (show) => emit('update:open', show))
watch(
  () => props.open,
  (bool) => (open.value = bool),
)

function changeOpen(e: boolean) {
  open.value = e
  emit('update:open', e)
}

function cancel() {
  open.value = false
  emit('cancel')
}

function confirm() {
  open.value = false
  emit('confirm')
}
</script>
