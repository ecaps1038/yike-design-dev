<template>
  <TransitionGroup :name="slideName" @after-leave="onLeave">
    <Notification
      v-for="item in notifications"
      :ref="(el) => setRefs(el, item.id)"
      :key="item.id"
      v-bind="getProps(item)"
      @close="handleClose(item.id)"
      @lock-notifications="lockNotifications"
      @unlock-notifications="unlockNotifications"
    ></Notification>
  </TransitionGroup>
</template>
<script lang="ts" setup>
import { NotificationGroupProps } from './notification'
import Notification from './notification.vue'
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<NotificationGroupProps>(), {
  notifications: () => [],
  position: 'topRight',
})

const emits = defineEmits(['close', 'destroy'])
const notifyRefs = ref<any>({})

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

const slideName = computed(() => {
  return props.position + 'Notification'
})

const computedChildRefs = computed(() => {
  return Object.values(notifyRefs.value)
    .filter((ref) => !!ref)
    .map((ref) => ref)
})

const setRefs = (el: any, id: any) => {
  notifyRefs.value[id] = el
}

const lockNotifications = () => {
  computedChildRefs.value.forEach((item: any) => {
    item.pause()
  })
}

const unlockNotifications = () => {
  let firstReaminTime: number //第一个duration不为0的组件的剩余倒数时间；
  let flag = false //标志是否已找到第一个duration不为0的组件；

  computedChildRefs.value.forEach((item: any) => {
    if (!flag && !item.timer.isFixed) {
      firstReaminTime = item.timer.remainTime
      flag = true
    }
    item.play(firstReaminTime)
  })
}
</script>
