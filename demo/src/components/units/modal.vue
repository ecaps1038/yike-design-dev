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
  {
    title: '异步关闭',
    note: '在Modal中进行接口的调用可以通过接口返回状态修改模态框状态',
    code: `<Modal :visible="visible" @close="handleColse" :confirm="handleAsyncConfirm">
  这个世界最需要的就是爱与和平
</Modal>


const visible = ref<boolean>(false)

const handleColse = (modalVisible: boolean) => {
  visible.value = modalVisible
}

const handleAsyncConfirm = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false)
    }, 1500)
  })
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
    name: 'confirm',
    expl: '确定（可进行异步关闭）',
    type: `Function<() => Promise<boolean> | boolean`,
    normal: '-',
  },
  {
    key: '5',
    name: 'align-center',
    expl: '模态框标题是否剧中',
    type: `boolean`,
    normal: 'false',
  },
  {
    key: '6',
    name: 'mask-closable',
    expl: '是否可以通过点击模态框遮照层关闭',
    type: `boolean`,
    normal: 'true',
  },
  {
    key: '7',
    name: 'mask',
    expl: '是否显示遮照层',
    type: `boolean`,
    normal: 'true',
  },
  {
    key: '8',
    name: 'cancel-text',
    expl: '取消的文字描述',
    type: `string`,
    normal: 'cancel',
  },
  {
    key: '9',
    name: 'confirm-text',
    expl: '确认的文字描述',
    type: `string`,
    normal: 'confirm',
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
    name: 'close',
    expl: '关闭Modal模态框之后触发',
    type: ``,
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
    name: 'title',
    expl: '模态框标题',
    type: `Hello yike`,
  },
  {
    key: '2',
    name: '-',
    expl: 'ModalContent',
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
const loading = ref<boolean>(false)
const yike = ref([])
const yk = '逸刻时光只读'
const visible = ref(false)
const visible1 = ref(false)
const visible2 = ref(false)
const handleColse = (modalVisible: boolean) => {
  visible.value = modalVisible
}
const handleConfirm = () => {
  return false
}

const handleAsyncConfirm = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false)
    }, 1500)
  })
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
      <Button @click="visible1 = true">打开</Button>
      <Modal
        :visible="visible1"
        :confirm="() => false"
        @close="(visible:boolean) => visible1 = visible"
        footer-align="end"
      >
        这个世界最需要的就是爱与和平
      </Modal>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <Button @click="visible2 = true">打开</Button>
      <Modal
        :visible="visible2"
        :confirm="handleAsyncConfirm"
        @close="(visible:boolean) => visible2 = visible"
        footer-align="end"
      >
        这个世界最需要的就是爱与和平
        <br />
        <br />
        Modal 模态框将在1.5s后关闭
      </Modal>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Modal . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Modal . Events</Title>
      <div class="unit-table">
        <Table :data="data1" :columns="columns1"></Table>
      </div>
      <Title :level="4">Modal . Slots</Title>
      <div class="unit-table">
        <Table :data="data2" :columns="columns2"></Table>
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
