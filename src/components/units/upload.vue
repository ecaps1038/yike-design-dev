<script setup lang="ts">
import { reactive, ref } from 'vue'
import CaseCard from '@/components/CaseCard.vue'

const uploadUrl: any = ref(null)
uploadUrl.value = 'http://192.168.1.207:3976/upload'

//说明部分
let datas = [
  {
    title: '文件上传',
    note: '其他类型文件上传基本用法。',
    code: `/* js 模块*/
const handleSuccess = (e: any, fileList: any) => {
  console.log('🚀 ~ file: upload.vue:94 ~ handleSuccess ~ fileList:', fileList)
}
const handleDelete = (fileList: any) => {
  console.log('🚀 ~ file: upload.vue:97 ~ handleDelete ~ fileList:', fileList)
}
const handleError = (err: any) => {
  console.log('🚀 ~ file: upload.vue:97 ~ handleError ~ err:', err)
}
/* template */
<upload
  accept="*"
  :uploadUrl="uploadUrl"
  :multiple="true"
  :fileList="data[0].fileList"
  @handleSuccess="handleSuccess"
  @handleDelete="handleDelete"
  @handleError="handleError"
></upload>
        `,
  },
  {
    title: '单文件上传',
    note: '通过multiple参数控制',
    code: `       <upload
          accept="*"
          :uploadUrl="uploadUrl"
          :multiple="false"
          @handleSuccess="handleSuccess"
          @handleDelete="handleDelete"
          @handleError="handleError"
      ></upload>`,
  },
  {
    title: '图片文件上传',
    note: '若接受参数为images，即仅接受图片文件，将用图片UI进行文件交互',
    code: `      <upload
          accept="image/*"
          :uploadUrl="uploadUrl"
          :multiple="true"
          @handleSuccess="handleSuccess"
          @handleDelete="handleDelete"
          @handleError="handleError"
        ></upload>`,
  },
  {
    title: '单张文件上传',
    note: '通过multiple参数控制',
    code: `       <upload
          accept="image/*"
          :uploadUrl="uploadUrl"
          :multiple="false"
          :file-list="data[0].imageList"
          @handleSuccess="handleSuccess"
          @handleDelete="handleDelete"
          @handleError="handleError"
        ></upload>`,
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
    key: '1',
    name: 'accept',
    expl: '接收文件类型',
    type: `string`,
    normal: '*',
  },
  {
    key: '2',
    name: 'mutiple',
    expl: '是否上传多个文件',
    type: `boolean`,
    normal: 'true',
  },
  {
    key: '3',
    name: 'uploadUrl',
    expl: '文件服务url',
    type: `string`,
    normal: '-',
  },
  {
    key: '4',
    name: 'fileList',
    expl: '回显文件列表',
    type: `Array<UploadFile>`,
    normal: '{}',
  },
])
const mokeFiles = [
  {
    fileList: [
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ],
    imageList: [
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ],
  },
]
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
    name: 'handleSuccess',
    expl: '文件上传成功时触发',
    type: `res:{服务器返回结果},fileList:{当前文件列表`,
  },
  {
    key: '2',
    name: 'handleDelete',
    expl: '文件删除时触发',
    type: `res:{服务器返回结果},fileList:{当前文件列表`,
  },
  {
    key: '3',
    name: 'handleError',
    expl: '文件上传失败时触发',
    type: `err:{服务器返回结果`,
  },
])

//复选框内容
const yike = ref(3.5)
const handleSuccess = (e: any, fileList: any) => {
  console.log('🚀 ~ file: upload.vue:94 ~ handleSuccess ~ fileList:', fileList)
}
const handleDelete = (fileList: any) => {
  console.log('🚀 ~ file: upload.vue:97 ~ handleDelete ~ fileList:', fileList)
}
const handleError = (err: any) => {
  console.log('🚀 ~ file: upload.vue:97 ~ handleError ~ err:', err)
}
</script>

<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Upload 文件上传</Title>
      <Paragraph>用于常规文件或图片文件的上传。</Paragraph>
      <CaseCard
        :title="datas[0].title"
        :note="datas[0].note"
        :code="datas[0].code"
      >
        <upload
          accept="*"
          :uploadUrl="uploadUrl"
          :multiple="true"
          :fileList="mokeFiles[0].fileList"
          @handleSuccess="handleSuccess"
          @handleDelete="handleDelete"
          @handleError="handleError"
        ></upload>
      </CaseCard>
      <CaseCard
        :title="datas[1].title"
        :note="datas[1].note"
        :code="datas[1].code"
      >
        <upload
          accept="*"
          :uploadUrl="uploadUrl"
          :multiple="false"
          @handleSuccess="handleSuccess"
          @handleDelete="handleDelete"
          @handleError="handleError"
        ></upload>
      </CaseCard>
      <CaseCard
        :title="datas[2].title"
        :note="datas[2].note"
        :code="datas[2].code"
      >
        <upload
          accept="image/*"
          :uploadUrl="uploadUrl"
          :multiple="true"
          @handleSuccess="handleSuccess"
          @handleDelete="handleDelete"
          @handleError="handleError"
        ></upload>
      </CaseCard>
      <CaseCard
        :title="datas[3].title"
        :note="datas[3].note"
        :code="datas[3].code"
      >
        <upload
          accept="image/*"
          :uploadUrl="uploadUrl"
          :multiple="false"
          :file-list="mokeFiles[0].imageList"
          @handleSuccess="handleSuccess"
          @handleDelete="handleDelete"
          @handleError="handleError"
        ></upload>
      </CaseCard>
    </div>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Textarea . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Textarea . Events</Title>
      <div class="unit-table">
        <Table :data="data1" :columns="columns1"></Table>
      </div>
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
