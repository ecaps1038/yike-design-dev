<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "开关基本使用。",
    code: `...js
const yike=ref(true);

...html
<Space>
  <Switch />
  <Switch v-model="yike" />
  {{ yike }}
</Space>`,
  },
  {
    title: "禁用状态",
    note: "禁用开关。",
    code: `<Space>
  <Switch disabled />
  <Switch :modelValue="true" disabled />
</Space>`,
  },
  {
    title: "开关尺寸",
    note: "开关分为 m 、s 两种尺寸。",
    code: `<Space>
  <Switch size="m" />
  <Switch size="s" />
</Space>`,
  },
  {
    title: "加载中状态",
    note: "通过设置 loading 使开关处于加载中状态，此时开关不可点击。",
    code: `...js
const yike=ref(true);  

...html
<Space>
  <Switch size="m" loading />
  <Switch v-model="yike" size="s" loading />
</Space>`,
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
    type: `boolean`,
    normal: "null",
  },
  {
    key: "2",
    name: "loading",
    expl: "是否为加载中状态",
    type: `boolean`,
    normal: "false",
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
    name: "size",
    expl: "开关的大小",
    type: `'m' | 's'`,
    normal: "m",
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
    type: `value: boolean`,
  },
]);

//开关绑定
const yike = ref(true);
</script>

<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Switch 开关</Title>
      <Paragraph>互斥性的操作控件，用户可打开或关闭某个功能。</Paragraph>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <Space>
        <Switch />
        <Switch v-model="yike" />
        {{ yike }}
      </Space>
    </CaseCard>
    <CaseCard :title="datas[1].title" :note="datas[1].note" :code="datas[1].code">
      <Space>
        <Switch disabled />
        <Switch :modelValue="true" disabled />
      </Space>
    </CaseCard>
    <CaseCard :title="datas[2].title" :note="datas[2].note" :code="datas[2].code">
      <Space>
        <Switch size="m" />
        <Switch size="s" />
      </Space>
    </CaseCard>
    <CaseCard :title="datas[3].title" :note="datas[3].note" :code="datas[3].code">
      <Space>
        <Switch size="m" loading />
        <Switch v-model="yike" size="s" loading />
      </Space>
    </CaseCard>
    
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Switch . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Switch . Events</Title>
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