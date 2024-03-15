<template>
  <yk-space>
    <yk-button status="primary" @click="open">show Message</yk-button>
    <yk-button status="danger" @click="openJSX">show JSX</yk-button>
    <yk-button status="warning" @click="openVNode">show VNode</yk-button>
  </yk-space>
</template>
<script setup lang="tsx">
import { getCurrentInstance, createVNode } from 'vue'
import { IconFireFireFill } from '@yike-design/ui/components/svg-icon'
const proxy: any = getCurrentInstance()?.proxy
const open = () => {
  proxy.$notification({ type: 'primary', message: 'This is a message.' })
}
const openVNode = () => {
  proxy.$notification({
    type: 'warning',
    message: createVNode('p', null, [
      createVNode('span', null, 'Message can be '),
      createVNode('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
const openJSX = () => {
  proxy.$notification({
    type: 'error',
    message: () => (
      <span style={{ color: 'red' }}>
        <IconFireFireFill style={{ marginRight: '10px' }} />
        Message can be JSX
      </span>
    ),
  })
}
</script>
