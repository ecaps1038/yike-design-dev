<template>
  <TransitionGroup name="right" @after-leave="onLeave">
    <Notification
      v-for="item in notifications"
      v-bind="getProps(item)"
      :key="item.id"
      @close="handleClose(item.id)"
    ></Notification>
  </TransitionGroup>
</template>
<script lang="ts" setup>
import { NotificationGroupProps } from './notification'
import Notification from './notification.vue'

const props = withDefaults(defineProps<NotificationGroupProps>(), {
  notifications: () => [],
})

const emits = defineEmits(['close', 'destroy'])

const handleClose = (id: string | undefined | number) => {
  emits('close', id)
}

const onLeave = () => {
  emits('destroy')
}

const getProps = (item) => {
  return Object.keys(item)
    .filter((k) => !['id', 'onClose'].includes(k))
    .reduce((res, k) => Object.assign(res, { [k]: item[k] }), {})
}
</script>
