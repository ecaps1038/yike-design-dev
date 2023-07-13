<script setup lang="ts">
import { reactive } from "vue";
import CaseCard from "@/components/CaseCard.vue";
import "@/yike-design/assets/font/line/iconfont.js";
import "@/yike-design/assets/font/surface/iconfont.js";
import { Avatar } from "@/yike-design";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "基本简单用法",
    code: `<Crumb>
  <CrumbItem>Home</CrumbItem>
  <CrumbItem path="#">Design</CrumbItem>
  <CrumbItem>Yike</CrumbItem>
</Crumb>`,
  },
  {
    title: "自定义图标",
    note: "若字段需要用图标展示，可以直接插入Icon图标。",
    code: `<Crumb>
  <CrumbItem>
    <Icon name="yk-zhuye" />
  </CrumbItem>
  <CrumbItem path="#">Design</CrumbItem>
  <CrumbItem>Yike</CrumbItem>
</Crumb>`,
  },
  {
    title: "参数化配置 routes",
    note: "可以利用 routes 直接将面包屑json数据直接导入。",
    code: `/* js 模块*/
const routes = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/module',
    name: '组件',
  },
  {
    path: '/yike',
    name: 'Yike'
  },
];

/* template */
<Crumb :routes="routes" />`,
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
    name: "routes",
    expl: "直接传入面包屑内容",
    type: `[json]`,
    normal: "-",
  },
]);
const data1 = reactive([
  {
    key: "1",
    name: "path",
    expl: "节点跳转连接地址",
    type: `string`,
    normal: "-",
  },
]);

//面包屑的参数
const routes = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/module',
    name: '组件',
  },
  {
    path: '/yike',
    name: 'Yike'
  },
];
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Breadcrumb 面包屑</Title>
      <Paragraph>用于识别页面在层次结构内的位置，并根据需要向上返回。面包屑只提供较简单样式，未设变量部份可修改源码定制化。</Paragraph>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <Crumb>
        <CrumbItem>Home</CrumbItem>
        <CrumbItem path="#">Design</CrumbItem>
        <CrumbItem>Yike</CrumbItem>
      </Crumb>
    </CaseCard>
    <CaseCard :title="datas[1].title" :note="datas[1].note" :code="datas[1].code">
      <Crumb>
        <CrumbItem>
          <Icon name="yk-zhuye" />
        </CrumbItem>
        <CrumbItem path="#">Design</CrumbItem>
        <CrumbItem>Yike</CrumbItem>
      </Crumb>
    </CaseCard>
    <CaseCard :title="datas[2].title" :note="datas[2].note" :code="datas[2].code">
      <Crumb :routes="routes" />
    </CaseCard>
    
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Crumb</Title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">CrumbItem</Title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <Table :data="data1" :columns="columns"></Table>
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