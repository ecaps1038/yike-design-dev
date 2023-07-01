<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "通过鼠标或者键盘输入范围内的标准数值，可通过min 、max控制范围。",
    code: `<Space direction="vertical">
  <Stepper v-model="yike[0]" />
  <Stepper :modelValue="12" :max="20" :min="1" />
</Space>`,
  },
  {
    title: "状态",
    note: "可以设置禁用和错误状态。",
    code: `<space direction="vertical">
  <Stepper :modelValue="12" disabled />
  <Stepper v-model="yk" readonly />
  <Stepper v-model="yike[2]" error />
</space>`,
  },
  {
    title: "尺寸 size",
    note: "定义了四种默认尺寸 s, m, l, xl ，默认为 l 。",
    code: `<space direction="vertical">
  <Stepper v-model="yike[3]" size="s" />
  <Stepper v-model="yike[4]" size="m" />
  <Stepper v-model="yike[5]" size="l" />
  <Stepper v-model="yike[6]" size="xl" />
</space>`,
  },
  {
    title: "精度和步长",
    note: "通过 precision 来设置数字精度。通过 step 来设置数字步长。",
    code: `<Stepper v-model="yike[7]" :precision="4" :step="1.2" />`,
  },
];

//api部分
const columns = [
  {
    title: "参数名",
    dataIndex: "name",
    light: false,
  },
  {
    title: "描述",
    dataIndex: "expl",
    light: false,
  },
  {
    title: "类型",
    dataIndex: "type",
    light: true,
  },
  {
    title: "默认值",
    dataIndex: "normal",
    light: false,
  },
];
const data = reactive([
  {
    key: "1",
    name: "model-value(v-model)",
    expl: "绑定值",
    type: `number`,
    normal: "-",
  },
  {
    key: "3",
    name: "disabled",
    expl: "是否禁用",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "4",
    name: "readonly",
    expl: "是否为只读状态",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "5",
    name: "error",
    expl: "是否为错误状态",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "6",
    name: "placeholder",
    expl: "提示文字",
    type: `string`,
    normal: "-",
  },
  {
    key: "7",
    name: "size",
    expl: "输入框大小",
    type: `'s' | 'm' | 'l' | 'xl'`,
    normal: "l",
  },
  {
    key: "8",
    name: "precision",
    expl: "数字精度",
    type: `number`,
    normal: "-",
  },
  {
    key: "9",
    name: "step",
    expl: "数字变化步长",
    type: `number`,
    normal: "false",
  },
]);

const columns1 = [
  {
    title: "事件名",
    dataIndex: "name",
    light: false,
  },
  {
    title: "描述",
    dataIndex: "expl",
    light: false,
  },
  {
    title: "参数",
    dataIndex: "type",
    light: true,
  },
];
const data1 = reactive([
  {
    key: "1",
    name: "focus",
    expl: "输入框获取焦点时触发",
    type: `value `,
  },
  {
    key: "2",
    name: "blur",
    expl: "输入框失去焦点时触发",
    type: `value `,
  },
  {
    key: "4",
    name: "pEnter",
    expl: "用户按下回车时触发",
    type: `- `,
  },
]);

//input内容
const yike = ref([]);
const yk = 123456;
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Stepper 步进器</Title>
      <Paragraph>用于数字加减与数字输入框功能一致。</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <Space direction="vertical">
        <Stepper v-model="yike[0]" />
        <Stepper :modelValue="12" :max="20" :min="1" />
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <space direction="vertical">
        <Stepper :modelValue="12" disabled />
        <Stepper v-model="yk" readonly />
        <Stepper v-model="yike[2]" error />
      </space>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <space direction="vertical">
        <Stepper v-model="yike[3]" size="s" />
        <Stepper v-model="yike[4]" size="m" />
        <Stepper v-model="yike[5]" size="l" />
        <Stepper v-model="yike[6]" size="xl" />
      </space>
    </CaseCard>
    <CaseCard
      :title="datas[3].title"
      :note="datas[3].note"
      :code="datas[3].code"
    >
      <Stepper v-model="yike[7]" :precision="4" :step="1.2" />
    </CaseCard>

    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Stepper . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Stepper . Events</Title>
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