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
import { MessageOptions } from './message'
import { PropType } from 'vue'
import Message from './message.vue'
const props = defineProps({
  messages: {
    type: Array as PropType<MessageOptions[]>,
    default: () => [],
  },
})

const emits = defineEmits(['close', 'destroy'])

const handleClose = (id: string | undefined | number) => {
  emits('close', id)
}
const onLeave = () => {
  emits('destroy')
}
</script>
