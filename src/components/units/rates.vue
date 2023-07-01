<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "评分组件基本用法。",
    code: `<Rate />`,
  },
  {
    title: "半选",
    note: "指定 allowHalf 来开启半选。",
    code: `<Rate allowHalf v-model="yike"/><span>{{ yike }}分</span>`,
  },
  {
    title: "状态",
    note: "通过设置 disabled 和 readonly 属性让评分组件为不可操作和只读状态。",
    code: `<Space direction="vertical">
  <Rate disabled/>
  <Rate allowHalf v-model="yike" readonly/>
</Space>`,
  },
  {
    title: "自定义颜色",
    note: "通过 color 可以自定义颜色。",
    code: `<Space direction="vertical">
  <Rate color="#18DB84"/>
  <Rate allowHalf color="#672AEA"/>
</Space>`,
  },
  {
    title: "任意长度的评分",
    note: "通过指定 count 来指定任意长度的评分组件。",
    code: `<Rate :count="10"/>`,
  }
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
    name: "modelValue(v-model)",
    expl: "绑定值",
    type: `number`,
    normal: "null",
  },
  {
    key: "2",
    name: "disabled",
    expl: "是否禁用",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "3",
    name: "readonly",
    expl: "是否为只读状态",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "4",
    name: "allowHalf",
    expl: "是否允许半选",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "5",
    name: "count",
    expl: "评分总数",
    type: `number`,
    normal: "5",
  },
  {
    key: "6",
    name: "color",
    expl: "颜色",
    type: `string`,
    normal: "-",
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
    name: "change",
    expl: "值改变时触发",
    type: `value: number`,
  },
  {
    key: "2",
    name: "hoverChange",
    expl: "鼠标移动到数值上时触发",
    type: `value: number`,
  },
]);

//复选框内容
const yike = ref(3.5);


</script>

<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Rate 评分</Title>
      <Paragraph>用于评分或打星的组件。</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
    <Rate />
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
    <Space>
      <Rate allowHalf v-model="yike"/><span>{{ yike }}分</span>
    </Space>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
    <Space direction="vertical">
      <Rate disabled/>
      <Rate allowHalf v-model="yike" readonly/>
    </Space>
    </CaseCard>
    <CaseCard
      :title="datas[3].title"
      :note="datas[3].note"
      :code="datas[3].code"
    >
      <Space direction="vertical">
        <Rate color="#18DB84"/>
        <Rate allowHalf color="#672AEA"/>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[4].title"
      :note="datas[4].note"
      :code="datas[4].code"
    >
    <Rate :count="10"/>
    </CaseCard>
    
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Rate . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Rate . Events</Title>
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