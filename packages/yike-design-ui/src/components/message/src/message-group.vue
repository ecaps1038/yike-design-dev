<template>
  <TransitionGroup name="fade" @after-leave="onLeave">
    <Message
      v-for="item in messages"
      :key="item.id"
      :message="item.message"
      :type="item.type"
      :offset="item.offset"
      :z-index="item.zIndex"
      @close="handleClose(item.id)"
    ></Message>
  </TransitionGroup>
</template>
<script lang="ts" setup>
import { MessageGroupProps } from './message'
import Message from './message.vue'
const props = withDefaults(defineProps<MessageGroupProps>(), {
  messages: () => [],
})

const emits = defineEmits(['close', 'destroy'])

const handleClose = (id: string | undefined | number) => {
  emits('close', id)
}
const onLeave = () => {
  emits('destroy')
}
</script>
