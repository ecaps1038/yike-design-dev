<script setup lang="ts">
import { reactive } from "vue";
import CaseCard from "@/components/CaseCard.vue";
import "@/yike-design/assets/font/line/iconfont.js";
import "@/yike-design/assets/font/surface/iconfont.js";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "Space 组件以横向排列间距为基本用法",
    code: `<Space>
  <Button>第一个按钮</Button>
  <Button>按钮2</Button>
  <Button shape="circle"><Icon name="yk-jiahao" /></Button>
</Space>`,
  },
  {
    title: "垂直 direction",
    note: "Space 组件可以设置垂直方向排列的间距。",
    code: `<Space direction="vertical">
  <Button>第一个按钮</Button>
  <Button>按钮2</Button>
  <Button shape="circle"><Icon name="yk-jiahao" /></Button>
</Space>`,
  },
  {
    title: "水平尺寸 size",
    note: "内置4个尺寸，分别是 s - 4px , m - 8px , l - 16px , xl -24px ,默认为 m ,也可以输入数字自定义尺寸",
    code: `<Title :level="5">size="s"</Title>
<Space size="s">
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</Space>
<Title :level="5">size="m"</Title>
<Space size="m">
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</Space>
<Title :level="5">size="l"</Title>
<Space size="l">
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</Space>
<Title :level="5">size="xl"</Title>
<Space size="xl">
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</Space>
<Title :level="5">自定义 :size="40"</Title>
<Space :size="40">
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</Space>`,
  },
  {
    title: "垂直尺寸 rsize",
    note: "与垂直尺寸相同内置4个尺寸,默认为 m ,也可以输入数字自定义尺寸",
    code: `<Title :level="5">size="s"</Title>
<Space rsize="s" direction="vertical">
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</Space>
<Title :level="5">size="m"</Title>
<Space rsize="s" direction="vertical">
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</Space>
`,
  },
  {
    title: "对齐 aline",
    note: "内置 4 种对齐方式，分别为 start center end baseline，在水平模式下默认为 start。",
    code: `<Title :level="5">默认上对其</Title>
<Space>
  <Button size="s">按钮1</Button>
  <Button>按钮2</Button>
  <Button size="xl">按钮3</Button>
</Space>
<Title :level="5">aline="center"</Title>
<Space aline="center">
  <Button size="s">按钮1</Button>
  <Button>按钮2</Button>
  <Button size="xl">按钮3</Button>
</Space>
<Title :level="5">aline="end"</Title>
<Space aline="end">
  <Button size="s">按钮1</Button>
  <Button>按钮2</Button>
  <Button size="xl">按钮3</Button>
</Space>
<Title :level="5">aline="baseline"</Title>
<Space aline="baseline">
  <Button size="s">按钮1</Button>
  <Button>按钮2</Button>
  <Button size="xl">按钮3</Button>
</Space>`,
  },
  {
    title: "换行 wrap",
    note: "当一行放不下时自动换行",
    code: ` <Space wrap>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
</Space>`,
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
    name: "direction",
    expl: "间距方向",
    type: `'vertical' ｜ 'horizontal'`,
    normal: "horizontal",
  },
  {
    key: "2",
    name: "size",
    expl: "水平尺寸",
    type: `'s' ｜ 'm' | 'l' | 'xl' | number`,
    normal: "l",
  },
  {
    key: "3",
    name: "rsize",
    expl: "垂直尺寸",
    type: `'s' ｜ 'm' | 'l' | 'xl' | number`,
    normal: "l",
  },
  {
    key: "4",
    name: "aline",
    expl: "对齐",
    type: `'start' ｜ 'center' | 'end' | 'baseline'`,
    normal: "satrt",
  },
  {
    key: "5",
    name: "warp",
    expl: "换行",
    type: `boolean`,
    normal: "false",
  },
]);
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Space 间距</Title>
      <Paragraph>用来设置个元素之间的间距。</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <Space>
        <Button>第一个按钮</Button>
        <Button>按钮2</Button>
        <Button shape="circle">
          <Icon name="yk-jiahao" />
        </Button>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <Space direction="vertical">
        <Button>第一个按钮</Button>
        <Button>按钮2</Button>
        <Button shape="circle">
          <Icon name="yk-jiahao" />
        </Button>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <Title :level="5">size="s"</Title>
      <Space size="s">
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
      <Title :level="5">size="m"</Title>
      <Space size="m">
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
      <Title :level="5">size="l"</Title>
      <Space size="l">
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
      <Title :level="5">size="xl"</Title>
      <Space size="xl">
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
      <Title :level="5">自定义 :size="40"</Title>
      <Space :size="40">
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[3].title"
      :note="datas[3].note"
      :code="datas[3].code"
    >
      <Title :level="5">rsize="s"</Title>
      <Space rsize="s" direction="vertical">
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
      <Title :level="5">rsize="m"</Title>
      <Space rsize="m" direction="vertical">
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[4].title"
      :note="datas[4].note"
      :code="datas[4].code"
    >
      <Title :level="5">默认上对其</Title>
      <Space>
        <Button size="s">按钮1</Button>
        <Button>按钮2</Button>
        <Button size="xl">按钮3</Button>
      </Space>
      <Title :level="5">aline="center"</Title>
      <Space aline="center">
        <Button size="s">按钮1</Button>
        <Button>按钮2</Button>
        <Button size="xl">按钮3</Button>
      </Space>
      <Title :level="5">aline="end"</Title>
      <Space aline="end">
        <Button size="s">按钮1</Button>
        <Button>按钮2</Button>
        <Button size="xl">按钮3</Button>
      </Space>
      <Title :level="5">aline="baseline"</Title>
      <Space aline="baseline">
        <Button size="s">按钮1</Button>
        <Button>按钮2</Button>
        <Button size="xl">按钮3</Button>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[5].title"
      :note="datas[5].note"
      :code="datas[5].code"
    >
      <Space wrap>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
        <Button>按钮</Button>
      </Space>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
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