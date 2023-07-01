<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "简单的选择",
    code: `<Radio value="yike">单选框</Radio>`,
  },
  {
    title: "禁用状态",
    note: "禁用单选框。",
    code: `<Space>
  <Radio value="yike" :modelValue="true" disabled>已选</Radio>
  <Radio value="yike" :modelValue="false" disabled>未选</Radio>
</Space>`,
  },
  {
    title: "受控",
    note: "通过 v-model (modelValue) 属性控制是否选中",
    code: `...js
const yike = ref(false);
const changes = () => {
  yike.value = !yike.value;
};

...html
<Space aline="center">
  <Radio value="yike" :modelValue="yike">单选框</Radio>
  <Button @click="changes">改变</Button>
</Space>`,
  },
  {
    title: "单选框组选项",
    note: "通过 <RadioGroup> 组件展示复选框组。设置 direction 可进行横竖排列切换，通过 options 属性设置子元素。",
    code: `...js
const two = ref("逸刻");
const three = ref("c");
let op1 = [1, 2, 3, 4, 5];
let op2 = ["你好", "昨天", "今天", "明天", "逸刻"];
let op3 = [
  { label: "博客", value: "a" },
  { label: "留言墙", value: "b" },
  { label: "聊天室", value: "c" },
  { value: "俄罗斯方块", disabled: true },
];  

...html
<Space direction="vertical" :rsize="40">
  <RadioGroup :size="40" :options="op1"/>
  <p>{{ two }}</p>
  <RadioGroup v-model="two" :options="op2" />
  <p>{{ three }}</p>
  <RadioGroup direction="vertical" :options="op3" v-model="three" />
</Space>`,
  },
  {
    title: "按钮类型的单选框组",
    note: "通过指定 type='button' ，可以显示按钮类型的单选框组,并设有 s 、m 、l 、 xl 四种尺寸。",
    code: `...js
const yike = ref("a");
let options = [
  { label: "博客", value: "a" },
  { label: "留言墙", value: "b" },
  { label: "聊天室", value: "c" },
  { value: "俄罗斯方块", disabled: true },
];  

...html
<Space direction="vertical">
  {{ yike }}
  <RadioGroup size="xl" :options="options" v-model="yike" type="button"/>
  <RadioGroup size="l" :options="options" v-model="yike" type="button"/>
  <RadioGroup size="m" :options="options" v-model="yike" type="button"/>
  <RadioGroup size="s" :options="options" v-model="yike" type="button"/>
</Space>`,
  },{
    title: "填充式按钮类型单选框组",
    note: "在 type='button' 下 ，通过设置 solid 可以显示填充式按钮类型的单选框组。",
    code: `...js
const yike = ref("a");
let options = [
  { label: "博客", value: "a" },
  { label: "留言墙", value: "b" },
  { label: "聊天室", value: "c" },
  { value: "俄罗斯方块", disabled: true },
];  

...html
<Space direction="vertical">
  {{ yike }}
  <RadioGroup size="xl" :options="options" v-model="yike" type="button" solid/>
  <RadioGroup size="l" :options="options" v-model="yike" type="button" solid/>
  <RadioGroup size="m" :options="options" v-model="yike" type="button" solid/>
  <RadioGroup size="s" :options="options" v-model="yike" type="button" solid/>
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
    name: "modelValue(v-model)",
    expl: "绑定值",
    type: `boolean`,
    normal: "null",
  },
  {
    key: "2",
    name: "value",
    expl: "选项的值",
    type: `string | number | boolean`,
    normal: "-",
  },
  {
    key: "3",
    name: "disabled",
    expl: "是否禁用",
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
    name: "change",
    expl: "值改变时触发",
    type: `value: boolean`,
  },
]);
const data4 = reactive([
  {
    key: "1",
    name: "change",
    expl: "值改变时触发",
    type: `value: string | number `,
  },
]);

const data2 = reactive([
  {
    key: "1",
    name: "modelValue(v-model)",
    expl: "绑定值",
    type: `string`,
    normal: "-",
  },
  {
    key: "2",
    name: "options",
    expl: "选项",
    type: `Array<string | number | CheckboxOption>`,
    normal: "-",
  },
  {
    key: "3",
    name: "direction",
    expl: "复选框排列方向",
    type: `'vertical' ｜ 'horizontal'`,
    normal: "horizontal",
  },
  {
    key: "4",
    name: "size",
    expl: "间距",
    type: `'s' ｜ 'm' | 'l' | 'xl' | number`,
    normal: "l",
  },
  {
    key: "5",
    name: "type",
    expl: "单选框样式",
    type: `'radio' ｜ 'button'`,
    normal: "radio",
  },
  {
    key: "6",
    name: "solid",
    expl: "当type='button'时，按钮是否填充",
    type: `boolean`,
    normal: "false",
  },
]);

const data3 = reactive([
  {
    key: "1",
    name: "label",
    expl: "文案(不填写被value替代)",
    type: `string`,
    normal: "-",
  },
  {
    key: "2",
    name: "value",
    expl: "选项的值",
    type: `string | numer`,
    normal: "-",
  },
  {
    key: "3",
    name: "disabled",
    expl: "是否禁用",
    type: `boolean`,
    normal: "false",
  },
]);

//复选框内容
const yike = ref(false);
const changes = () => {
  yike.value = !yike.value;
};

const one = ref("a");
const abc = ref("a");
const two = ref("逸刻");
const three = ref("c");
let op1 = [1, 2, 3, 4, 5];
let op2 = ["你好", "昨天", "今天", "明天", "逸刻"];
let op3 = [
  { label: "博客", value: "a" },
  { label: "留言墙", value: "b" },
  { label: "聊天室", value: "c" },
  { value: "俄罗斯方块", disabled: true },
];
let op4 = [
  { label: "博客", value: "a" },
  { label: "留言墙", value: "b" },
  { label: "聊天室", value: "c" },
  { value: "俄罗斯方块", disabled: true },
];
let op5 = [
  { label: "博客", value: "a" },
  { label: "留言墙", value: "b" },
  { label: "聊天室", value: "c" },
  { value: "俄罗斯方块", disabled: true },
];

</script>

<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Radio 单选框</Title>
      <Paragraph>在一组相关且互斥数据中，用户仅能选择一个选项。</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <Radio value="yike">单选框</Radio>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <Space>
        <Radio value="yike" :modelValue="true" disabled>已选</Radio>
        <Radio value="yike" :modelValue="false" disabled>未选</Radio>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <Space aline="center">
        <Radio value="yike" :modelValue="yike">单选框</Radio>
        <Button @click="changes">改变</Button>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[3].title"
      :note="datas[3].note"
      :code="datas[3].code"
    >
      <Space direction="vertical" :rsize="40">
        <RadioGroup :size="40" :options="op1"/>
        <p>{{ two }}</p>
        <RadioGroup v-model="two" :options="op2" />
        <p>{{ three }}</p>
        <RadioGroup direction="vertical" :options="op3" v-model="three" />
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[4].title"
      :note="datas[4].note"
      :code="datas[4].code"
    >
    <Space direction="vertical">
      {{ one }}
      <RadioGroup size="xl" :options="op4" v-model="one" type="button"/>
      <RadioGroup size="l" :options="op4" v-model="one" type="button"/>
      <RadioGroup size="m" :options="op4" v-model="one" type="button"/>
      <RadioGroup size="s" :options="op4" v-model="one" type="button"/>
    </Space>
    </CaseCard>
    <CaseCard
      :title="datas[5].title"
      :note="datas[5].note"
      :code="datas[5].code"
    >
    <Space direction="vertical">
      {{ abc }}
      <RadioGroup size="xl" :options="op5" v-model="abc" type="button" solid/>
      <RadioGroup size="l" :options="op5" v-model="abc" type="button" solid/>
      <RadioGroup size="m" :options="op5" v-model="abc" type="button" solid/>
      <RadioGroup size="s" :options="op5" v-model="abc" type="button" solid/>
    </Space>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Radio . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Radio . Events</Title>
      <div class="unit-table">
        <Table :data="data1" :columns="columns1"></Table>
      </div>
      <Title :level="4">RadioGroup . Props</Title>
      <div class="unit-table">
        <Table :data="data2" :columns="columns"></Table>
      </div>
      <Title :level="4">RadioGroup . Events</Title>
      <div class="unit-table">
        <Table :data="data4" :columns="columns1"></Table>
      </div>
      <Title :level="4">ChencboxPotions</Title>
      <div class="unit-table">
        <Table :data="data3" :columns="columns"></Table>
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