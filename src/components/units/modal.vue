<script setup lang="ts">
import { reactive, ref } from 'vue'
import CaseCard from '@/components/CaseCard.vue'

//说明部分
let datas = [
  {
    title: '基本用法',
    note: '最简单使用方法',
    code: `<Modal :visible="visible" @close="handleColse" :confirm="handleConfirm">
  这个世界最需要的就是爱与和平
</Modal>

const visible = ref<boolean>(false)

const handleColse = (modalVisible: boolean) => {
  visible.value = modalVisible
}

const handleConfirm = () => {
  return false
}
`,
  },
  {
    title: '修改底部按钮定位',
    note: '最简单使用方法',
    code: `<Modal :visible="visible" @close="handleColse" :confirm="handleConfirm" footer-align="end">
  这个世界最需要的就是爱与和平
</Modal>


const visible = ref<boolean>(false)

const handleColse = (modalVisible: boolean) => {
  visible.value = modalVisible
}

const handleConfirm = () => {
  return false
}

`,
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
    name: 'visible',
    expl: '绑定值',
    type: `boolean`,
    normal: '-',
  },
  {
    key: '2',
    name: 'title',
    expl: '模态框的标题',
    type: `string`,
    normal: '-',
  },
  {
    key: '3',
    name: 'footer-align',
    expl: '底部按钮定位',
    type: `'start'｜'center'｜'end'`,
    normal: 'center',
  },
  {
    key: '4',
    name: 'readonly',
    expl: '是否为只读状态',
    type: `boolean`,
    normal: 'false',
  },
  {
    key: '5',
    name: 'error',
    expl: '是否为错误状态',
    type: `boolean`,
    normal: 'false',
  },
  {
    key: '6',
    name: 'placeholder',
    expl: '提示文字',
    type: `string`,
    normal: '-',
  },
  {
    key: '7',
    name: 'size',
    expl: '输入框大小',
    type: `'s' | 'm' | 'l' | 'xl'`,
    normal: 'l',
  },
  {
    key: '8',
    name: 'maxLength',
    expl: '输入值的最大长度',
    type: `number`,
    normal: '-',
  },
  {
    key: '9',
    name: 'showLimit',
    expl: '是否显示字数统计',
    type: `boolean`,
    normal: 'false',
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
    name: 'focus',
    expl: '输入框获取焦点时触发',
    type: `value `,
  },
  {
    key: '2',
    name: 'blur',
    expl: '输入框失去焦点时触发',
    type: `value `,
  },
  {
    key: '3',
    name: 'clear',
    expl: '用户点击清除按钮时触发',
    type: `- `,
  },
  {
    key: '4',
    name: 'pEnter',
    expl: '用户按下回车时触发',
    type: `- `,
  },
])

const columns2 = [
  {
    title: '插槽名',
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
    light: false,
  },
]
const data2 = reactive([
  {
    key: '1',
    name: 'prefix',
    expl: '前缀元素',
    type: `-`,
  },
  {
    key: '2',
    name: 'suffix',
    expl: '后缀元素',
    type: `-`,
  },
  {
    key: '3',
    name: 'prepend',
    expl: '前置标签',
    type: `-`,
  },
  {
    key: '4',
    name: 'append',
    expl: '后置标签',
    type: `-`,
  },
])

const data3 = reactive([
  {
    key: '1',
    name: 'invisible',
    expl: '是否显示可见按钮',
    type: `boolean`,
    normal: 'true',
  },
])

const data4 = reactive([
  {
    key: '1',
    name: 'button',
    expl: '是否为后置按钮模式',
    type: `boolean`,
    normal: 'false',
  },
  {
    key: '2',
    name: 'buttonDefine',
    expl: '是否自定义按钮内容',
    type: `boolean`,
    normal: 'false',
  },
  {
    key: '3',
    name: 'loading',
    expl: '是否为加载中状态',
    type: `boolean`,
    normal: 'false',
  },
])
const data5 = reactive([
  {
    key: '1',
    name: 'define',
    expl: '自定义按钮下的内容',
    type: `-`,
  },
])
const data6 = reactive([
  {
    key: '1',
    name: 'search',
    expl: '点击搜索图标或按钮时触发',
    type: `value`,
  },
])
//input内容
const yike = ref([])
const yk = '逸刻时光只读'
const visible = ref(false)
const handleColse = (modalVisible: boolean) => {
  visible.value = modalVisible
}
const handleConfirm = () => {
  return false
}
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Modal 模态框</Title>
      <Paragraph>基本弹窗组件，支持异步关闭</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <Button @click="visible = true">打开</Button>
      <Modal :visible="visible" @close="handleColse" :confirm="handleConfirm">
        这个世界最需要的就是爱与和平
      </Modal>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <Button @click="visible = true">打开</Button>
      <Modal
        :visible="visible"
        :confirm="handleConfirm"
        @close="handleColse"
        footer-align="end"
      >
        这个世界最需要的就是爱与和平
      </Modal>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Input . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Input . Events</Title>
      <div class="unit-table">
        <Table :data="data1" :columns="columns1"></Table>
      </div>
      <Title :level="4">Input . Slots</Title>
      <div class="unit-table">
        <Table :data="data2" :columns="columns2"></Table>
      </div>
      <Title :level="4">InputPassword . Props</Title>
      <div class="unit-table">
        <Table :data="data3" :columns="columns"></Table>
      </div>
      <Title :level="4">InputSearch . Props</Title>
      <div class="unit-table">
        <Table :data="data4" :columns="columns"></Table>
      </div>
      <Title :level="4">InputSearch . Events</Title>
      <div class="unit-table">
        <Table :data="data6" :columns="columns1"></Table>
      </div>
      <Title :level="4">InputSearch . Slots</Title>
      <div class="unit-table">
        <Table :data="data5" :columns="columns2"></Table>
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
