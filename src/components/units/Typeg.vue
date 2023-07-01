<script setup lang="ts">
import { reactive } from "vue";
import CaseCard from "@/components/CaseCard.vue";

//说明部分
let datas = [
  {
    title: "Title 级别 level",
    note: "展示不同级别的标题，一共五个级别",
    code: `<Title :level="1">H1 欢迎使用 Yike Design</Title>
<Title :level="2">H2 欢迎使用 Yike Design</Title>
<Title :level="3">H3 欢迎使用 Yike Design</Title>
<Title :level="4">H4 欢迎使用 Yike Design</Title>
<Title :level="5">H5 欢迎使用 Yike Design</Title>`,
  },
  {
    title: "类型 type",
    note: "所有文本内容都有该属性，这里以标题为例。不同类型分别有：default,primary,secondary,success,warning,danger 六种类型，默认为“default”",
    code: `<Title :level="3">标题不同类型展示</Title>
<Title :level="3" type="secondary">标题不同类型展示</Title>
<Title :level="3" type="primary">标题不同类型展示</Title>
<Title :level="3" type="success">标题不同类型展示</Title>
<Title :level="3" type="warning">标题不同类型展示</Title>
<Title :level="3" type="danger">标题不同类型展示</Title>`,
  },
  {
    title: "Text 文本",
    note: "展示不同样式的文本",
    code: `<Space direction="vertical">
	<Text>Yike Design</Text>
	<Text type="secondary">Secondary</Text>
	<Text type="third">third</Text>
	<Text type="primary">Secondary</Text>
	<Text type="success">Success</Text>
	<Text type="warning">Warning</Text>
	<Text type="danger">Danger</Text>
	<Text type="disabled">Disabled/third</Text>
	<Text b>Bold</Text>
	<Text mark>Mark</Text>
	<Text underline>Underline</Text>
	<Text del>Line through</Text>
</Space>`,
  },
  {
    title: "Paragraph 段落",
    note: "文本段落",
    code: `<Title :level="4">逸刻时光</Title>
<Paragraph type="secondary">出于对前端组件的好奇，利用业余时间将设计的一个应用提炼出部分设计规范，从而创建出此套对应的前端组件。期望人人都能直面源码，更佳灵活的使用在型项目中。</Paragraph>
<Title :level="4">Yike Design</Title>
<Paragraph>QQ群：740076696 欢迎加入交流；本人QQ：1334785356 加我请注明 “yike Design”。微信群不好分享，可加本人微信：<Text type="pcolor">yikeyikech</Text> 加我请注明 “yike Design” 之后将邀请进入相关群内，谢谢。</Paragraph>
<Paragraph>本组件库倾尽我多半的业余生活，也经历了一个个深夜的探索。若能得到您的肯定，这一切都是值得的！</Paragraph>`,
  },
  {
    title: "段落省略 ellipsis",
    note: "使用 ellipsis 可以对或行文本内容可以自定义较少行省略显示，且可以对省略内容进行展开。",
    code: `<Paragraph :ellipsis="{ rows: 1 }">出于对前端组件的好奇，利用业余时间将设计的一个应用提炼出部分设计规范，从而创建出此套对应的前端组件。期望人人都能直面源码，更佳灵活的使用在型项目中。
</Paragraph>
<Paragraph :ellipsis="{ rows: 2, showMore: true }">
	思路：1、判断当前内容是否超过三行。此处可以给每行设置一个行高line-height,渲染完后超过三倍的行高即认为是内容超过了三行。2、展示/收起状态的切换可以通过data中的参数来绑定。3、在底部使用来绝对定位展开该在的位置。4、根据业务需求来设定好展开和收起按钮需要呆的地方。
</Paragraph>`,
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
    name: "level",
    expl: "标题级别",
    type: `1 ｜ 2 ｜ 3 ｜ 4 ｜ 5 `,
    normal: "1",
  },
  {
    key: "2",
    name: "type",
    expl: "标题类型",
    type: `'default' ｜ 'primary' ｜ 'secondary' ｜ 'success' ｜ 'warning' ｜ 'danger' `,
    normal: "default",
  },
]);
const data1 = reactive([
  {
    key: "",
    name: "type",
    expl: "标题类型",
    type: `'default' ｜ 'primary' ｜ 'third' ｜ 'secondary' ｜ 'success' ｜ 'warning' ｜ 'danger' `,
    normal: "-",
  },
  {
    key: "2",
    name: "b",
    expl: "文字加粗",
    type: `false | true`,
    normal: "false",
  },
  {
    key: "3",
    name: "mark",
    expl: "标记样式",
    type: `false | true`,
    normal: "false",
  },
  {
    key: "4",
    name: "underline",
    expl: "下划线",
    type: `false | true`,
    normal: "false",
  },
  {
    key: "5",
    name: "del",
    expl: "删除线",
    type: `false | true`,
    normal: "false",
  },
]);
const data2 = reactive([
  {
    key: "",
    name: "type",
    expl: "标题类型",
    type: `'default' ｜ 'primary' ｜ 'third' ｜ 'secondary' ｜ 'success' ｜ 'warning' ｜ 'danger' `,
    normal: "-",
  },
  {
    key: "2",
    name: "b",
    expl: "文字加粗",
    type: `false | true`,
    normal: "false",
  },
  {
    key: "3",
    name: "ellipsis",
    expl: "自动溢出省略，rows 显示行数，showMore 展开按钮",
    type: `object`,
    normal: `{rows:'',showMore:false}`,
  },
  {
    key: "4",
    name: "copyable",
    expl: "拷贝文案按钮",
    type: `false | true`,
    normal: "false",
  },
]);
</script>
<template>
  <div class="space">
    <div class="top-title">
      <Title :level="2">Typegraphy 排版</Title>
      <Paragraph>用于展示标题、段落、文本内容。</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <Title :level="1">H1 欢迎使用 Yike Design</Title>
      <Title :level="2">H2 欢迎使用 Yike Design</Title>
      <Title :level="3">H3 欢迎使用 Yike Design</Title>
      <Title :level="4">H4 欢迎使用 Yike Design</Title>
      <Title :level="5">H5 欢迎使用 Yike Design</Title>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <Title :level="3">标题不同状态展示</Title>
      <Title :level="3" type="secondary">标题不同状态展示</Title>
      <Title :level="3" type="primary">标题不同状态展示</Title>
      <Title :level="3" type="success">标题不同状态展示</Title>
      <Title :level="3" type="warning">标题不同状态展示</Title>
      <Title :level="3" type="danger">标题不同状态展示</Title>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <Space direction="vertical">
        <Text>Yike Design</Text>
        <Text type="secondary">Secondary</Text>
        <Text type="third">third</Text>
        <Text type="primary">Secondary</Text>
        <Text type="success">Success</Text>
        <Text type="warning">Warning</Text>
        <Text type="danger">Danger</Text>
        <Text type="disabled">Disabled</Text>
        <Text b>Bold</Text>
        <Text mark>Mark</Text>
        <Text underline>Underline</Text>
        <Text del>Line through</Text>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[3].title"
      :note="datas[3].note"
      :code="datas[3].code"
    >
      <Title :level="4">逸刻时光</Title>
      <Paragraph type="secondary"
        >出于对前端组件的好奇，利用业余时间将设计的一个应用提炼出部分设计规范，从而创建出此套对应的前端组件。期望人人都能直面源码，更佳灵活的使用在型项目中。
      </Paragraph>
      <Title :level="4">Yike Design</Title>
      <Paragraph
        >QQ群：740076696 欢迎加入交流；本人QQ：1334785356 加我请注明 “yike
        Design”。微信群不好分享，可加本人微信：<Text type="pcolor"
          >yikeyikech</Text
        >
        加我请注明 “yike Design” 之后将邀请进入相关群内，谢谢。</Paragraph
      >
      <Paragraph
        >本组件库倾尽我多半的业余生活，也经历了一个个深夜的探索。若能得到您的肯定，这一切都是值得的！</Paragraph
      >
    </CaseCard>
    <CaseCard
      :title="datas[4].title"
      :note="datas[4].note"
      :code="datas[4].code"
    >
      <Paragraph :ellipsis="{ rows: 1 }"
        >出于对前端组件的好奇，利用业余时间将设计的一个应用提炼出部分设计规范，从而创建出此套对应的前端组件。期望人人都能直面源码，更佳灵活的使用在型项目中。
      </Paragraph>
      <Paragraph :ellipsis="{ rows: 2, showMore: true }">
        思路：1、判断当前内容是否超过三行。此处可以给每行设置一个行高line-height,渲染完后超过三倍的行高即认为是内容超过了三行。2、展示/收起状态的切换可以通过data中的参数来绑定。3、在底部使用来绝对定位展开该在的位置。4、根据业务需求来设定好展开和收起按钮需要呆的地方。
      </Paragraph>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Title</Title>
      <!-- <Text type="secondary"></Text> -->
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Text</Title>
      <div class="unit-table">
        <Table :data="data1" :columns="columns"></Table>
      </div>
      <Title :level="4">Paragraph</Title>
      <div class="unit-table">
        <Table :data="data2" :columns="columns"></Table>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.unit-table {
  width: 100%;
  // overflow: hidden;
  overflow-x: auto;
}
</style>