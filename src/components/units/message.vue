<template>
  <div class="message">
    <div>
      <Title :level="2">message 全局提示</Title>
      <Paragraph>全局提示，用于消息说明</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <div class="message-button">
        <Button @click="success">点击弹出成功全局提示</Button>
        <Button @click="warning">点击弹出警告全局提示</Button>
        <Button @click="error">点击弹出失败全局提示</Button>
      </div>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <div>
        <Button @click="longDuration">点击弹出10s全局提示</Button>
      </div>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <div>
        <Button @click="callBack">回调函数</Button>
      </div>
    </CaseCard>
    <div class="unit-table">
      <Title :level="3">API</Title>
      <Title :level="4">Message . Props</Title>
      <Table :data="data" :columns="columns"></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/yike-design'
import message from '@/yike-design/components/message/Message'
import CaseCard from '@/components/CaseCard.vue'
const columns = [
  {
    title: '参数名',
    dataIndex: 'name',
    light: false,
  },
  {
    title: '描述',
    dataIndex: 'expl',
    light: false,
  },
  {
    title: '类型',
    dataIndex: 'type',
    light: true,
  },
  {
    title: '默认值',
    dataIndex: 'normal',
    light: false,
  },
]
const data = [
  {
    key: '1',
    name: 'type',
    expl: '全局提示类型',
    type: `success | warning | error`,
    normal: 'success',
  },
  {
    key: '2',
    name: 'message',
    expl: '全局提示展示内容',
    type: `string`,
    normal: '- ',
  },
  {
    key: '3',
    name: 'duration',
    expl: '全局提示持续时间',
    type: `number`,
    normal: '3000',
  },
  {
    key: '4',
    name: 'onClose',
    expl: '全局提示关闭时回掉',
    type: `function`,
    normal: 'false',
  },
]
let datas = [
  {
    title: '基本用法',
    note: '用于弹出消息。',
    code: `message.success('您输入的消息')`,
  },
  {
    title: '修改延时',
    note: '用于延长消息弹出的时间',
    code: `message({
      type: 'success',
      message: '10s的全局提示展示时间',
      duration: 10000,
    })`,
  },
  {
    title: '回调函数',
    note: '在全局提示消失的时候，会调用该回调函数',
    code: `message({
      type: 'success',
      message: '回掉函数',
      onClose: () => {
        message.warning('这个是回掉函数返回的全局提示')
      },
    })`,
  },
]
const success = () => {
  message.success('您输入的消息')
}
const warning = () => {
  message.warning('您输入的消息')
}
const error = () => {
  message.error('您输入的消息')
}
const longDuration = () => {
  message({
    type: 'success',
    message: '10s的全局提示展示时间',
    duration: 10000,
  })
}
const callBack = () => {
  message({
    type: 'success',
    message: '回掉函数',
    onClose: () => {
      message.warning('这个是回掉函数返回的全局提示')
    },
  })
}
</script>

<style lang="less" scoped>
.message {
  &-button {
    display: flex;
    justify-content: space-between;
  }
}
</style>
