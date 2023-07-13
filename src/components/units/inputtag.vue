<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "标签输入框的基本用法。",
    code: `<InputTag v-model="yike" style="width:320px" placeholder="请输入框" allowClear />`,
  },
  {
    title: "状态",
    note: "可以设置禁用和错误状态。",
    code: `<space direction="vertical">
  <InputTag :modelValue="['逸刻时光','留言墙']" style="width:320px" disabled />
  <InputTag v-model="ykke" readonly style="width:320px" />
  <InputTag v-model="yike" placeholder="错误输入" error style="width:320px"/>
</space>`,
  },
  {
    title: "尺寸 size",
    note: "定义了四种默认尺寸 s, m, l, xl ，默认为 l 。",
    code: `<space direction="vertical">
  <InputTag placeholder="请输入" v-model="yike" size="s" style="width:320px" />
  <InputTag placeholder="请输入" v-model="yike" size="m" style="width:320px" />
  <InputTag placeholder="请输入" v-model="yike" size="l" style="width:320px" />
  <InputTag placeholder="请输入" v-model="yike" size="xl" style="width:320px" />
</space>`,
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
    type: `array ｜ string |number`,
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
const yike = ref([["yike", "逸刻"], ["逸刻"]]);
const yike1 = ref("a,aa,bb,dc");
const yike2 = ref("");
const yk = ["只读", "yike"];
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">InputTag 标签输入框</Title>
      <Paragraph>用来输入标签。</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <InputTag
        v-model="yike[0]"
        style="width: 320px"
        placeholder="请输入框"
        allowClear
      />
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <space direction="vertical">
        <InputTag
          :modelValue="['逸刻时光', '留言墙']"
          style="width: 320px"
          disabled
        />
        <InputTag v-model="yk" readonly style="width: 320px" />
        <InputTag
          v-model="yike[1]"
          placeholder="错误输入"
          error
          style="width: 320px"
        />
      </space>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <space direction="vertical">
        <InputTag
          placeholder="请输入"
          v-model="yike[2]"
          size="s"
          style="width: 320px"
        />
        <InputTag
          placeholder="请输入"
          v-model="yike[3]"
          size="m"
          style="width: 320px"
        />
        <InputTag
          placeholder="请输入"
          v-model="yike[4]"
          size="l"
          style="width: 320px"
        />
        <InputTag
          placeholder="请输入"
          v-model="yike[5]"
          size="xl"
          style="width: 320px"
        />
      </space>
    </CaseCard>

    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">InputTag . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">InputTag . Events</Title>
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