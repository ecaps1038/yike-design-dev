<script setup lang="ts">
import { reactive, ref } from 'vue'
import CaseCard from '@/components/CaseCard.vue'

const uploadUrl: any = ref(null)
if (process.env.NODE_ENV === 'development') {
  uploadUrl.value = 'http://192.168.1.207:3976/upload'
}
//说明部分
let datas = [
  {
    title: '基本用法',
    note: '单图片上传基本用法。',
    code: `<Rate />`,
  },
  {
    title: '文件上传',
    note: '其他文件上传基本用法。',
    code: `<Rate />`,
  },
]

//api部分
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
const data = reactive([
  {
    existFileList: [
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ],
  },
])
const columns1 = [
  {
    title: '事件名',
    dataIndex: 'name',
    light: false,
  },
  {
    title: '描述',
    dataIndex: 'expl',
    light: false,
  },
  {
    title: '参数',
    dataIndex: 'type',
    light: true,
  },
]
const data1 = reactive([
  {
    key: '1',
    name: 'change',
    expl: '值改变时触发',
    type: `value: number`,
  },
  {
    key: '2',
    name: 'hoverChange',
    expl: '鼠标移动到数值上时触发',
    type: `value: number`,
  },
])

//复选框内容
const yike = ref(3.5)
</script>

<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Upload 文件上传</Title>
      <Paragraph>用于常规文件或图片文件的上传。</Paragraph>
      <!-- <CaseCard
        :title="datas[0].title"
        :note="datas[0].note"
        :code="datas[0].code"
      >
        <upload accept="images/*" :uploadUrl="uploadUrl"></upload>
      </CaseCard> -->
      <CaseCard
        :title="datas[1].title"
        :note="datas[1].note"
        :code="datas[1].code"
      >
        <upload
          accept="*"
          :uploadUrl="uploadUrl"
          :multiple="true"
          :existFileList="data[0].existFileList"
        ></upload>
      </CaseCard>
    </div>
  </div>
</template>
<style lang="less" scoped>
.unit-table {
  width: 100%;
  // overflow: hidden;
  overflow-x: auto;
}
</style>
