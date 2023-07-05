<script setup lang="ts">
import { Checkbox, Dropdown, Pagination, Space } from '@/yike-design'
import { getCurrentInstance, ref, inject } from 'vue'

const { proxy }: any = getCurrentInstance() //获取全局变量

const handleClick = () => {
  proxy.$message({ type: 'success', message: '感谢你的记录！' })
}

const url = 'http://localhost:5173/src/assets/icon/yike.png'
const count = ref([12, 4, 234, 32])

//input
const idata = ref('yike时光')
const inputData = ref('逸刻')
const areaData = ref()
const check = ref(true)
const check1 = ref(true)
//点击改变选择
const checkS = () => {
  check1.value = !check1.value
}

//复选框
const aaa = ref(['d'])
const bbb = ref([1])
const ccc = ref(['b'])
let op1 = [1, 2, 3, 4, 5]
let op2 = ['d', 'b', 'x', 'y', 'z']
let op3 = [
  { label: 'a', value: 'a' },
  { label: 'b', value: 'b' },
  { label: 'c', value: 'c' },
  { label: 'd', value: 'd', disabled: true },
]
let op4 = [
  { value: 'A' },
  { value: 'B' },
  { value: 'C' },
  { value: 'D', disabled: true },
]

//全选
const indeterminate = ref(false)
const checkedAll = ref(false)
const data = ref()
data.value = []
let cdata = [1, 2, 3, 4, 5]

const handleChangeAll = (e: any) => {
  indeterminate.value = false
  if (e[0]) {
    checkedAll.value = true
    data.value = cdata
  } else {
    checkedAll.value = false
    data.value = []
  }
}

const handleChange = (values: any) => {
  if (values.length === cdata.length) {
    checkedAll.value = true
    indeterminate.value = false
  } else if (values.length === 0) {
    checkedAll.value = false
    indeterminate.value = false
  } else {
    checkedAll.value = true
    indeterminate.value = true
  }
}

//单选
const rs = ref(1)
const rs1 = ref('不一')
let rl1 = [1, 2, 3, 4, 5]
let rl2 = ['今天', '会成长', '可是', '如果明天', '会吗']
let rl3 = [
  { value: 'jishi' },
  { label: 'aafdf', value: 'a' },
  { label: '可是过', value: '可是过' },
  { label: '不一', value: '不一', disabled: true },
]
let rl4 = [
  { value: 'A' },
  { value: 'B' },
  { value: 'C' },
  { value: 'D', disabled: true },
]

const radio1 = ref(false)
//输出结果
const radioS = (e: any) => {
  console.log(e)
  console.log(radio1.value)
}
//改变
const changeR = () => {
  radio1.value = !radio1.value
}

//开关
const sw1 = ref(true)

//数字输入
const number = ref([])

//标签输入框
const tag = ref(['yike', '逸刻时光'])

//评分
const rate = ref(3.5)

//Modal visible
const visible = ref<boolean>(false)

const handleColse = (mvisible: boolean) => (visible.value = mvisible)
const handleConfirm = () => {
  // return false
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(false)
    }, 10)
  })
}
</script>

<template>
  <main class="ahome">
    <Title>评分</Title>
    <Title :level="3">基本用法</Title>
    <Space direction="vertical">
      <Rate />
      <Rate disabled />
    </Space>
    <Title :level="3">半分</Title>
    <Rate allowHalf />
    <Title :level="3">打分</Title>
    <space aline="center">
      <Rate allowHalf v-model="rate" />
      <span>{{ rate }}分</span>
    </space>
    <Title :level="3">颜色</Title>
    <space aline="center">
      <Rate allowHalf v-model="rate" color="#00aaee" />
      <span>{{ rate }}分</span>
    </space>
    <Title :level="3">只读</Title>
    <space aline="center">
      <Rate allowHalf v-model="rate" readonly />
      <span>{{ rate }}分</span>
    </space>
    <Title :level="3">自定义长度</Title>
    <space aline="center">
      <Rate allowHalf v-model="rate" :count="10" />
      <span>{{ rate }}分</span>
    </space>
    <Title>标签输入框</Title>
    <p>{{ tag }}</p>
    <Title :level="3">基本用法</Title>
    <Space direction="vertical">
      <InputTag v-model="tag" style="width: 360px" allowClear size="s" />
      <InputTag v-model="tag" style="width: 360px" allowClear size="m" />
      <InputTag v-model="tag" style="width: 360px" allowClear size="l" />
      <InputTag v-model="tag" style="width: 360px" allowClear size="xl" />
      <InputTag v-model="tag" style="width: 360px" allowClear error />
      <InputTag v-model="tag" style="width: 360px" disabled />
    </Space>
    <Title>步进器</Title>
    <Title :level="3">基本用法</Title>
    <Space>
      <Stepper v-model="number[0]" size="xl" :max="10" :min="0"></Stepper>
      <Stepper v-model="number[1]"></Stepper>
      <Stepper v-model="number[2]" size="m"></Stepper>
      <Stepper v-model="number[3]" size="s"></Stepper>
    </Space>
    <Title>数字输入框</Title>
    <Title :level="3">基本用法</Title>
    <Space>
      <InputNumber
        v-model="number[0]"
        size="xl"
        :max="10"
        :min="0"
      ></InputNumber>
      <InputNumber v-model="number[1]"></InputNumber>
      <InputNumber v-model="number[2]" size="m"></InputNumber>
      <InputNumber v-model="number[3]" size="s"></InputNumber>
    </Space>
    <Title :level="3">精度和步长</Title>
    <Space>
      <InputNumber v-model="number[4]" :precision="4" :step="1.2"></InputNumber>
    </Space>
    <Title>开关</Title>
    <Title :level="3">基本用法</Title>
    <Space>
      <Switch />
      <Switch v-model="sw1" />
      {{ sw1 }}
    </Space>
    <Title :level="3">不可操作</Title>
    <Space>
      <Switch disabled />
      <Switch v-model="sw1" disabled />
    </Space>
    <Title :level="3">大小</Title>
    <Space>
      <Switch size="m" />
      <Switch v-model="sw1" size="s" />
    </Space>
    <Title :level="3">加载</Title>
    <Space>
      <Switch size="m" loading />
      <Switch v-model="sw1" size="s" loading />
    </Space>
    <Title>单选</Title>
    <Title :level="3">基本用法</Title>
    <Space>
      <Radio value="今天" v-model="radio1" @change="radioS">单选框</Radio>
      <Button @click="changeR">改变</Button>
    </Space>
    <Title :level="3">组合</Title>
    <Space direction="vertical">
      {{ rs }}
      <RadioGroup :options="rl1" v-model="rs" />
      <RadioGroup :size="40" :options="rl1" v-model="rs" />
      <RadioGroup :options="rl4" v-model="rs" />
    </Space>
    <Title :level="3">按钮用法</Title>
    <Space>
      <Radio value="今天" v-model="radio1" @change="radioS" type="button">
        单选框
      </Radio>
    </Space>
    <Title :level="3">组合</Title>
    <Space direction="vertical">
      {{ rs1 }}
      <RadioGroup size="xl" :options="rl2" v-model="rs1" type="button" />
      <RadioGroup size="l" :options="rl2" v-model="rs1" type="button" />
      <RadioGroup size="m" :options="rl2" v-model="rs1" type="button" />
      <RadioGroup size="s" :options="rl2" v-model="rs1" type="button" />
      <RadioGroup :options="rl3" v-model="rs1" type="button" />
    </Space>
    <Title :level="3">填充</Title>
    <Space direction="vertical">
      <RadioGroup size="xl" :options="rl2" v-model="rs1" type="button" solid />
      <RadioGroup size="l" :options="rl2" v-model="rs1" type="button" solid />
      <RadioGroup size="m" :options="rl2" v-model="rs1" type="button" solid />
      <RadioGroup size="s" :options="rl2" v-model="rs1" type="button" solid />
      <RadioGroup :options="rl3" v-model="rs1" type="button" solid />
    </Space>
    <Title>复选框</Title>
    <Title :level="3">基本用法</Title>
    <Space>
      <Checkbox value="今天" v-model="check">复选框</Checkbox>
      <Checkbox value="今天" indeterminate>半选框</Checkbox>
    </Space>
    <Title :level="3">不可点击</Title>
    <Space>
      <Checkbox value="今天" :model-value="true" disabled>复选框</Checkbox>
      <Checkbox value="今天" :model-value="false" disabled>复选框</Checkbox>
    </Space>
    <Checkbox value="今天" :model-value="false" disabled>复选框</Checkbox>

    <Title :level="3">受控</Title>
    <Space>
      <Checkbox value="今天" :modelValue="check1">复选框</Checkbox>
      <Button @click="checkS()">改变</Button>
    </Space>

    <Title :level="3">复选框组</Title>
    <Space direction="vertical">
      <p>{{ aaa }}</p>
      <p>{{ bbb }}</p>
      <p>{{ ccc }}</p>
      <CheckboxGroup :size="40" :options="op1"></CheckboxGroup>
      <CheckboxGroup direction="vertical" v-model="aaa" :options="op2" />
      <CheckboxGroup :options="op3" v-model="ccc" />
      <CheckboxGroup :options="op4" />
    </Space>
    <Title :level="3">全选</Title>
    <Space direction="vertical">
      <Checkbox
        v-model="checkedAll"
        :indeterminate="indeterminate"
        @change="handleChangeAll"
      >
        全选
      </Checkbox>
      <CheckboxGroup
        :size="40"
        :options="cdata"
        v-model="data"
        @change="handleChange"
      />
    </Space>
    <Title>文本域</Title>
    <Title :level="3">基本用法</Title>
    <Textarea v-model="areaData" placeholder="请输入" allowClear resize />
    <Title :level="3">基本用法</Title>
    <space direction="vertical" style="width: 100%">
      <Textarea v-model="areaData" placeholder="请输入" disabled />
      <Textarea v-model="idata" placeholder="请输入" readonly />
      <Textarea
        v-model="areaData"
        placeholder="请输入"
        error
        style="height: 200px"
      />
    </space>
    <Title :level="3">数字统计</Title>
    <Textarea
      v-model="areaData"
      placeholder="请输入"
      :maxLength="120"
      showLimit
    />
    <Title :level="3">自适应高度</Title>
    <space direction="vertical" style="width: 100%">
      <Textarea v-model="areaData" placeholder="请输入" autoSize />
      <Textarea
        v-model="areaData"
        placeholder="请输入"
        :autoSize="{ minRows: 2, maxRows: 4 }"
      />
    </space>
    <Title>输入框</Title>
    <Title :level="3">基本用法</Title>
    <space>
      <Input
        v-model="inputData"
        placeholder="请输入"
        allowClear
        style="width: 180px"
      />
      <Input placeholder="请输入" allowClear />
    </space>
    <Input
      v-model="inputData"
      placeholder="请输入"
      allowClear
      style="width: 180px"
    />
    <Input placeholder="请输入" allowClear />
    <Title :level="3">状态</Title>
    <space direction="vertical">
      <Input v-model="inputData" />
      <Input placeholder="请输入" style="width: 320px" disabled />
      <Input v-model="idata" style="width: 320px" allowClear disabled error />
      <Input v-model="idata" style="width: 320px" error />
      <p>{{ idata }}</p>
    </space>
    <Title :level="3">尺寸</Title>
    <space direction="vertical">
      <Input v-model="inputData" style="width: 320px" size="xl" />
      <Input placeholder="请输入" style="width: 320px" size="l" />
      <Input placeholder="请输入" style="width: 320px" size="m" />
      <Input placeholder="请输入" style="width: 320px" size="s" allowClear />
    </space>
    <Title :level="3">前缀与后缀</Title>
    <space direction="vertical">
      <Input
        placeholder="请输入"
        v-model="inputData"
        style="width: 320px"
        allowClear
      >
        <template #prefix>
          <Icon name="yk-tianxie" />
        </template>
      </Input>
      <Input
        placeholder="请输入"
        v-model="inputData"
        style="width: 320px"
        allowClear
      >
        <template #suffix>
          <Icon name="yk-touxiang1" />
        </template>
      </Input>
    </space>
    <Title :level="3">前置与后置标签</Title>
    <space direction="vertical">
      <Input
        placeholder="请输入"
        v-model="inputData"
        style="width: 320px"
        allowClear
      >
        <template #prepend>
          <Icon name="yk-tianxie" />
        </template>
      </Input>
      <Input
        placeholder="请输入"
        v-model="inputData"
        style="width: 320px"
        allowClear
      >
        <template #append>
          <p>¥</p>
        </template>
      </Input>
    </space>
    <Title :level="3">数字统计</Title>
    <space direction="vertical">
      <Input
        v-model="inputData"
        style="width: 320px"
        size="xl"
        :maxLength="12"
        showLimit
      />
      <Input
        v-model="inputData"
        style="width: 320px"
        :maxLength="12"
        showLimit
      />
    </space>
    <Title :level="3">搜索框</Title>
    <space direction="vertical">
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="xl"
      />
      <InputSearch v-model="inputData" style="width: 320px" allowClear />
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="m"
      />
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="s"
      />
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="xl"
        button
        loading
      />
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="xl"
        button
      />
      <InputSearch v-model="inputData" style="width: 320px" allowClear button />
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="m"
        button
      />
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="s"
        button
      />

      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="m"
        loading
      />
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="s"
        button
        loading
      />
    </space>
    <Title :level="3">自定义搜索框内容</Title>
    <space direction="vertical">
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        size="xl"
        buttonDefine
      >
        <template #define>search</template>
      </InputSearch>
      <InputSearch
        v-model="inputData"
        style="width: 320px"
        allowClear
        buttonDefine
      >
        <template #define>
          <Icon name="yk-sousuo" />
          <span style="paddingleft: 4px">搜索</span>
        </template>
      </InputSearch>
    </space>
    <Title :level="3">密码输入框</Title>
    <space direction="vertical">
      <InputPassword
        v-model="inputData"
        style="width: 320px"
        size="xl"
        allowClear
      />
      <InputPassword v-model="inputData" style="width: 320px" allowClear />
      <InputPassword
        v-model="inputData"
        style="width: 320px"
        size="s"
        allowClear
      />
    </space>
    <Title :level="3">模态框 Modal</Title>
    <Button @click="visible = true">打开Modal</Button>
    <Modal
      :visible="visible"
      @close="handleColse"
      :confirm="handleConfirm"
      title="Hi,Modal"
      footer-align="end"
      :align-center="true"
      cancel-text="取消"
      confirm-text="确定"
      :maskClosable="true"
    >
      <template #title>Hello Modal</template>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, mollitia!
      Corrupti quas asperiores, temporibus delectus eum ipsum amet, vel quo
      possimus reprehenderit nisi quaerat dicta, fuga consequuntur porro est
      dolorum?
    </Modal>
    <Title :level="3">演示</Title>
    <Icon name="yk-xin" style="color: #00aaee; fontsize: 40px" />
  </main>
</template>

<style lang="less" scoped>
.ahome {
  padding: 20px;
}

.drop-icon {
  margin-left: 4px;
  transition: all @animatb;
}

.dropc {
  transform: rotate(180deg);
}
</style>
