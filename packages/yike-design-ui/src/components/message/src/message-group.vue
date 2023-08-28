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
import { MessageGroupProps } from './message'
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

const getProps = (item: any) => {
  return Object.keys(item)
    .filter((k) => !['id', 'onClose'].includes(k))
    .reduce((res, k) => Object.assign(res, { [k]: item[k] }), {})
}
</script>
