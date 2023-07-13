<script setup lang="ts">
import { reactive } from "vue";
import CaseCard from "@/components/CaseCard.vue";
import "@/yike-design/assets/font/line/iconfont.js";
import "@/yike-design/assets/font/surface/iconfont.js";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "最简单使用方法",
    code: `<Pagination :total="200"/>`,
  },
  {
    title: "修改每页展示条目 showPageSize",
    note: "定义每页展示不同条目数量，目前以最小数目倍数递增。",
    code: `<Pagination :total="200" showPageSize/>`,
  },
  {
    title: "跳转到固定页 showJumper",
    note: "输入页码，可快速跳转到指定页。",
    code: `<Pagination :total="200" showJumper/>`,
  },
  {
    title: "显示总数 showTotal",
    note: "通过设置 showTotal 来显示数据总数。",
    code: `<Pagination :total="200" showTotal/>`,
  },
  {
    title: "尺寸 size",
    note: "通过指定 size 字段，可以使用不同尺寸的分页器。定义了大、中、小三种尺寸。",
    code: `<space direction="vertical">
  <Pagination :total="200" size="s" showTotal showPageSize showJumper/>
  <Pagination :total="200" size="m" showTotal showPageSize showJumper/>
  <Pagination :total="200" size="l" showTotal showPageSize showJumper/>
</space>`,
  },
  {
    title: "简洁模式 simple",
    note: "在空间有限的场景下，可以将 simple 设置为 true，使用较为简单的文本分页方式。",
    code: `<Pagination :total="2000" simple/>`,
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
    name: "disabled",
    expl: "是否禁用",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "2",
    name: "total",
    expl: "数据总数",
    type: `number`,
    normal: "-",
  },
  {
    key: "3",
    name: "showTotal",
    expl: "是否显示数据总数",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "4",
    name: "showJumper",
    expl: "是否显示快速跳转到某页",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "5",
    name: "showPageSize",
    expl: "是否显示每页条数切换",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "6",
    name: "size",
    expl: "分页器尺寸",
    type: `'s' | 'm' | 'l'`,
    normal: "l",
  },
  {
    key: "7",
    name: "simple",
    expl: "是否应用精简分页模式",
    type: `boolean`,
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
    name: "pageData",
    expl: "分页器内容改变时触发",
    type: `object : 'pageSize' , 'nowPage' `,
  },
  
]);

//获取分页反馈信息
const pageData = (e: any) => {
  console.log(e)
}
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Pagination 分页</Title>
      <Paragraph>采用分页控制单页内的信息数量，并进行页面跳转。</Paragraph>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <Pagination :total="200" @pageData="pageData"/>
    </CaseCard>
    <CaseCard :title="datas[1].title" :note="datas[1].note" :code="datas[1].code">
      <Pagination :total="200" @pageData="pageData" showPageSize/>
    </CaseCard>
    <CaseCard :title="datas[2].title" :note="datas[2].note" :code="datas[2].code">
      <Pagination :total="200" @pageData="pageData" showJumper/>
    </CaseCard>
    <CaseCard :title="datas[3].title" :note="datas[3].note" :code="datas[3].code">
      <Pagination :total="200" @pageData="pageData" showTotal/>
    </CaseCard>
    <CaseCard :title="datas[4].title" :note="datas[4].note" :code="datas[4].code">
      <space direction="vertical">
        <Pagination :total="200" size="s" showTotal showPageSize showJumper/>
        <Pagination :total="200" size="m" showTotal showPageSize showJumper/>
        <Pagination :total="200" size="l" showTotal showPageSize showJumper/>
      </space>
    </CaseCard>
    <CaseCard :title="datas[5].title" :note="datas[5].note" :code="datas[5].code">
      <Pagination :total="2000" simple/>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Pagination . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Pagination . Events</Title>
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