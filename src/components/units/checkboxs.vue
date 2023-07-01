<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "简单的勾选",
    code: `<Checkbox value="yike">复选框</Checkbox>`,
  },
  {
    title: "禁用状态",
    note: "禁用复选框。",
    code: `<Space>
  <Checkbox value="yike" :modelValue="true" disabled>已选复选框</Checkbox>
  <Checkbox value="yike" :modelValue="false" disabled>未选复选框</Checkbox>
</Space>`,
  },
  {
    title: "受控",
    note: "通过 v-model (modelValue) 属性控制是否选中",
    code: `...js
const yike = ref(false);
const changeCheckbox = () => {
  yike.value = !yike.value;
};

...html    
<Space aline="center">
  <Checkbox value="yike" :modelValue="yike">复选框</Checkbox>
  <Button @click="changeCheckbox()">改变</Button>
</Space>`,
  },
  {
    title: "复选框组选项",
    note: "通过 <CheckboxGroup> 组件展示复选框组。设置 direction 可进行横竖排列切换，设置 size 可设置间距，与组建 Space 一致。",
    code: `...js
const two = ref(["逸刻"]);
const three = ref(["c"]);
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
  <CheckboxGroup :size="40" :options="op1"> </CheckboxGroup>
  <p>{{ two }}</p>
  <CheckboxGroup v-model="two" :options="op2" />
  <p>{{ three }}</p>
  <CheckboxGroup direction="vertical" :options="op3" v-model="three" />
</Space>`,
  },
  {
    title: "全选",
    note: "在实现全选的功能时，可以通过 indeterminate 属性展示半选效果。",
    code: `...js
const indeterminate = ref(false);
const checkedAll = ref(false);
const selected = ref();
selected.value = [];
let options = [1, 2, 3, 4, 5];

const handleChangeAll = (e: any) => {
  indeterminate.value = false;
  if (e[0]) {
    checkedAll.value = true;
    selected.value = options;
  } else {
    checkedAll.value = false;
    selected.value = [];
  }
};

const handleChange = (values: any) => {
  if (values.length === options.length) {
    checkedAll.value = true;
    indeterminate.value = false;
  } else if (values.length === 0) {
    checkedAll.value = false;
    indeterminate.value = false;
  } else {
    checkedAll.value = true;
    indeterminate.value = true;
  }
};

...html
<Space direction="vertical">
  <Checkbox
    v-model="checkedAll"
    :indeterminate="indeterminate"
    @change="handleChangeAll"
    >全选</Checkbox
  >
  <CheckboxGroup
    :size="40"
    :options="options"
    v-model="selected"
    @change="handleChange"
  />
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
  {
    key: "4",
    name: "indeterminate",
    expl: "是否为半选状态",
    type: `boolean`,
    normal: "false",
  }
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

const data2 = reactive([
  {
    key: "1",
    name: "modelValue(v-model)",
    expl: "绑定值",
    type: `array`,
    normal: "[]",
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
const data4 = reactive([
  {
    key: "1",
    name: "change",
    expl: "值改变时触发",
    type: `value:  (string | number | boolean)[] `,
  },
]);


//复选框内容
const yike = ref(false);
const changeCheckbox = () => {
  yike.value = !yike.value;
};

const one = ref([1]);
const two = ref(["逸刻"]);
const three = ref(["c"]);
let op1 = [1, 2, 3, 4, 5];
let op2 = ["你好", "昨天", "今天", "明天", "逸刻"];
let op3 = [
  { label: "博客", value: "a" },
  { label: "留言墙", value: "b" },
  { label: "聊天室", value: "c" },
  { value: "俄罗斯方块", disabled: true },
];

//全选
const indeterminate = ref(false);
const checkedAll = ref(false);
const selected = ref();
selected.value = [];
let options = [1, 2, 3, 4, 5];

const handleChangeAll = (e: any) => {
  indeterminate.value = false;
  if (e[0]) {
    checkedAll.value = true;
    selected.value = options;
  } else {
    checkedAll.value = false;
    selected.value = [];
  }
};

const handleChange = (values: any) => {
  if (values.length === options.length) {
    checkedAll.value = true;
    indeterminate.value = false;
  } else if (values.length === 0) {
    checkedAll.value = false;
    indeterminate.value = false;
  } else {
    checkedAll.value = true;
    indeterminate.value = true;
  }
};
</script>

<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Checkbox 复选框</Title>
      <Paragraph>在一组数据中，用户可通过复选框选择一个或多个数据。</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <Checkbox value="yike">复选框</Checkbox>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <Space>
        <Checkbox value="yike" :modelValue="true" disabled>已选复选框</Checkbox>
        <Checkbox value="yike" :modelValue="false" disabled
          >未选复选框</Checkbox
        >
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <Space aline="center">
        <Checkbox value="yike" :modelValue="yike">复选框</Checkbox>
        <Button @click="changeCheckbox()">改变</Button>
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[3].title"
      :note="datas[3].note"
      :code="datas[3].code"
    >
      <Space direction="vertical" :rsize="40">
        <CheckboxGroup :size="40" :options="op1"> </CheckboxGroup>
        <p>{{ two }}</p>
        <CheckboxGroup v-model="two" :options="op2" />
        <p>{{ three }}</p>
        <CheckboxGroup direction="vertical" :options="op3" v-model="three" />
      </Space>
    </CaseCard>
    <CaseCard
      :title="datas[4].title"
      :note="datas[4].note"
      :code="datas[4].code"
    >
    <Space direction="vertical">
      <Checkbox
        v-model="checkedAll"
        :indeterminate="indeterminate"
        @change="handleChangeAll"
        >全选</Checkbox
      >
      <CheckboxGroup
        :size="40"
        :options="options"
        v-model="selected"
        @change="handleChange"
      />
    </Space>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Checkbox . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Checkbox . Events</Title>
      <div class="unit-table">
        <Table :data="data1" :columns="columns1"></Table>
      </div>
      <Title :level="4">CheckboxGroup . Props</Title>
      <div class="unit-table">
        <Table :data="data2" :columns="columns"></Table>
      </div>
      <Title :level="4">CheckboxGroup . Events</Title>
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