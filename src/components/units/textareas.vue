<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";
import "@/yike-design/assets/font/line/iconfont.js";
import "@/yike-design/assets/font/surface/iconfont.js";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "用于多行输入。",
    code: `<Textarea v-model="yike" placeholder="请输入" allowClear />`,
  },
  {
    title: "文本域状态",
    note: "文本域可以设置禁用和错误状态。",
    code: `<space direction="vertical" style="width:100%">
  <Textarea v-model="yk" placeholder="请输入" disabled />
  <Textarea v-model="yk" placeholder="请输入" readonly />
  <Textarea v-model="yike" placeholder="请输入" error style="height: 200px;" />
</space>`,
  },
  {
    title: "高度可调节 resize",
    note: "当设置 resize 为真时，文本域高度可拖拉调节。",
    code: `<Textarea v-model="yike" placeholder="请输入" resize />`,
  },
  {
    title: "字数统计",
    note: "设置 maxLength 可以限制最大字数，配合 showLimit 可以显示字数统计。",
    code: `<Textarea v-model="yike" placeholder="请输入" :maxLength="120" showLimit />`,
  },
  {
    title: "自适应高度",
    note: "通过设置 autoSize，可以让文本框自适应输入内容。",
    code: `<space direction="vertical" style="width:100%">
    <Textarea v-model="yike" placeholder="请输入" autoSize />
    <Textarea v-model="yike" placeholder="请输入" :autoSize="{ minRows: 2, maxRows: 4 }" />
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
    name: "v-model",
    expl: "绑定值",
    type: `string`,
    normal: "-",
  },
  {
    key: "2",
    name: "allowClear",
    expl: "是否允许清空输入框",
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
    name: "maxLength",
    expl: "输入值的最大长度",
    type: `number`,
    normal: "-",
  },
  {
    key: "8",
    name: "showLimit",
    expl: "是否显示字数统计",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "9",
    name: "resize",
    expl: "是否高度可调节",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "10",
    name: "autoSize",
    expl: "高度自适应",
    type: `boolean｜{ minRows?: number; maxRows?: number }`,
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
    name: "focus",
    expl: "文本域获取焦点时触发",
    type: `value `,
  }, {
    key: "2",
    name: "blur",
    expl: "文本域失去焦点时触发",
    type: `value `,
  }, {
    key: "3",
    name: "clear",
    expl: "用户点击清除按钮时触发",
    type: `- `,
  }, {
    key: "4",
    name: "pEnter",
    expl: "用户按下回车时触发",
    type: `- `,
  },
]);

//input内容
const yike = ref([]);
const yk = "逸刻时光只读";

</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Textarea 文本域</Title>
      <Paragraph>多行纯文本编辑控件，适用于评论或反馈表单中的一段意见。</Paragraph>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <Textarea v-model="yike[0]" placeholder="请输入" allowClear />
    </CaseCard>
    <CaseCard :title="datas[1].title" :note="datas[1].note" :code="datas[1].code">
      <space direction="vertical" style="width:100%">
        <Textarea v-model="yk" placeholder="请输入" disabled />
        <Textarea v-model="yk" placeholder="请输入" readonly />
        <Textarea v-model="yike[1]" placeholder="请输入" error style="height: 200px;" />
      </space>
    </CaseCard>
    <CaseCard :title="datas[2].title" :note="datas[2].note" :code="datas[2].code">
      <Textarea v-model="yike[2]" placeholder="请输入" allowClear resize />
    </CaseCard>
    <CaseCard :title="datas[3].title" :note="datas[3].note" :code="datas[3].code">
      <Textarea v-model="yike[3]" placeholder="请输入" :maxLength="120" showLimit />
    </CaseCard>
    <CaseCard :title="datas[4].title" :note="datas[4].note" :code="datas[4].code">
      <space direction="vertical" style="width:100%">
        <Textarea v-model="yike[4]" placeholder="请输入" autoSize />
        <Textarea v-model="yike[5]" placeholder="请输入" :autoSize="{ minRows: 2, maxRows: 4 }" />
      </space>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Textarea . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Textarea . Events</Title>
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