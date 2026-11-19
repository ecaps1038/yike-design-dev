<template>
  <TransitionGroup name="down" @after-leave="onLeave">
    <Message
      v-for="item in messages"
      v-bind="getProps(item)"
      :key="item.id"
      @close="handleClose(item.id)"
    ></Message>
  </TransitionGroup>
</template>
<script lang="ts" setup>
import { MessageGroupProps, MessageOptions, MessageProps } from './message'
import Message from './message.vue'

withDefaults(defineProps<MessageGroupProps>(), {
  messages: () => [],
})

const emits = defineEmits(['close', 'destroy'])

const handleClose = (id: string | undefined | number) => {
  emits('close', id)
}

const onLeave = () => {
  emits('destroy')
}

const getProps = (item: MessageOptions): MessageProps => {
  const props: Record<string, any> = {}
  Object.keys(item).forEach((key) => {
    if (['id', 'onClose', 'onDestroy'].includes(key)) return
    props[key] = item[key as keyof MessageOptions]
  })
  return props as MessageProps
}
</script>
