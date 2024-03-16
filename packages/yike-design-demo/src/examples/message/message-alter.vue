<template>
  <yk-space>
    <yk-button status="primary" @click="handleSuccess">触发成功</yk-button>
    <yk-button status="danger" @click="handleError">JSX 写法</yk-button>
    <yk-button status="warning" @click="handleWarning">VNode 写法</yk-button>
  </yk-space>
</template>
<script setup lang="tsx">
import { h, getCurrentInstance } from 'vue'
import { IconFireFireFill } from '@yike-design/ui/components/svg-icon'
const proxy: any = getCurrentInstance()?.proxy
const handleSuccess = () => {
  proxy.$message({ type: 'success', message: '这里可以自定义提示信息' })
}
const handleError = () => {
  proxy.$message({
    type: 'error',
    message: () => (
      <span style={{ color: 'red' }}>
        <IconFireFireFill style={{ marginRight: '10px' }} />
        失败提示
      </span>
    ),
  })
}
const handleWarning = () => {
  proxy.$message({
    type: 'success',
    message: h('span', { style: 'color:green;' }, '成功提示'),
  })
}
</script>
