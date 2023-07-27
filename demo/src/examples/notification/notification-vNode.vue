<template>
  <yk-space>
    <yk-button status="primary" @click="open">show Message</yk-button>
    <yk-button status="primary" @click="openVNode">show VNode</yk-button>
  </yk-space>
</template>
<script setup lang="ts">
import { getCurrentInstance, createVNode } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const open = () => {
  proxy.$notification({ type: 'primary', message: 'This is a message.' })
}
const openVNode = () => {
  proxy.$notification({
    type: 'primary',
    message: createVNode('p', null, [
      createVNode('span', null, 'Message can be '),
      createVNode('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
</script>
