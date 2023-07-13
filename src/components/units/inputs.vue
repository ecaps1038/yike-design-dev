<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "最简单使用方法",
    code: `<Input v-model="yike" placeholder="请输入" allowClear />`,
  },
  {
    title: "输入框状态",
    note: "输入框可以设置禁用和错误状态。",
    code: `<space direction="vertical">
  <Input placeholder="不可操作" disabled />
  <Input v-model="yike" readonly/>
  <Input v-model="yike" placeholder="错误输入框" error />
</space>`,
  },
  {
    title: "输入框尺寸 size",
    note: "输入框定义了四种默认尺寸 s, m, l, xl ，默认为 l 。",
    code: `<space direction="vertical">
  <Input placeholder="请输入" v-model="yike" size="s" />
  <Input placeholder="请输入" v-model="yike" size="m" />
  <Input placeholder="请输入" v-model="yike" size="l" />
  <Input placeholder="请输入" v-model="yike" size="xl" />
</space>`,
  },
  {
    title: "前缀与后缀",
    note: "通过指定 prefix 和 suffix 插槽来在输入框内添加前缀和后缀。",
    code: `<space direction="vertical">
  <Input placeholder="请输入" v-model="yike" allowClear>
  <template #prefix>
    <Icon name="yk-touxiang1" />
  </template>
  </Input>
  <Input placeholder="请输入" v-model="yike" allowClear>
  <template #suffix>
    <Icon name="yk-tianxie" />
  </template>
  </Input>
</space>`,
  },
  {
    title: "前置、后置标签",
    note: "通过指定 prepend 和 append 插槽在输入框前后添加元素。",
    code: `<space direction="vertical">
  <Input placeholder="请输入" v-model="yike" allowClear>
  <template #prepend>
    <Icon name="yk-tianxie" />
  </template>
  </Input>
  <Input placeholder="请输入" v-model="yike" allowClear>
  <template #append>
    <p>¥</p>
  </template>
  </Input>
</space>`,
  },
  {
    title: "字数统计",
    note: "设置 maxLength 可以限制最大字数，配合 showLimit 可以显示字数统计。",
    code: `<Input v-model="yike" placeholder="请输入" :maxLength="12" showLimit />`,
  },
  {
    title: "搜索框",
    note: "带有搜索按钮的输入框，用于内容检索。",
    code: `<space direction="vertical">
  <InputSearch v-model="yike" placeholder="请输入" allowClear />
  <InputSearch v-model="yike" placeholder="请输入" allowClear button />
</space>`,
  },
  {
    title: "自定义搜索按钮 buttonDefine",
    note: " 可以自定义搜索按钮的内容。",
    code: `<space direction="vertical">
  <InputSearch v-model="yike" placeholder="请输入" allowClear buttonDefine>
    <template #define>search</template>
  </InputSearch>
  <InputSearch v-model="yike" placeholder="请输入" allowClear buttonDefine>
    <template #define>
      <Icon name="yk-sousuo" /><span style="paddingLeft:4px;">搜索</span>
    </template>
  </InputSearch>
</space>`,
  },
  {
    title: "搜索框（加载中） loading",
    note: "通过 loading 属性可以让搜索框展示加载中状态。",
    code: `<space direction="vertical">
  <InputSearch v-model="yike" loading />
  <InputSearch v-model="yike" button loading />
</space>`,
  },
  {
    title: "密码输入框",
    note: "用于输入密码，可以点击右边图标进行密码显示与隐藏。",
    code: `<InputPassword v-model="yike" placeholder="请输入" allowClear />`,},
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
    name: "size",
    expl: "输入框大小",
    type: `'s' | 'm' | 'l' | 'xl'`,
    normal: "l",
  },{
    key: "8",
    name: "maxLength",
    expl: "输入值的最大长度",
    type: `number`,
    normal: "-",
  },
  {
    key: "9",
    name: "showLimit",
    expl: "是否显示字数统计",
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
    name: "focus",
    expl: "输入框获取焦点时触发",
    type: `value `,
  },{
    key: "2",
    name: "blur",
    expl: "输入框失去焦点时触发",
    type: `value `,
  },{
    key: "3",
    name: "clear",
    expl: "用户点击清除按钮时触发",
    type: `- `,
  },{
    key: "4",
    name: "pEnter",
    expl: "用户按下回车时触发",
    type: `- `,
  },
]);

const columns2 = [
  {
    title: "插槽名",
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
    light: false,
  },
];
const data2 = reactive([
  {
    key: "1",
    name: "prefix",
    expl: "前缀元素",
    type: `-`,
  },{
    key: "2",
    name: "suffix",
    expl: "后缀元素",
    type: `-`,
  },{
    key: "3",
    name: "prepend",
    expl: "前置标签",
    type: `-`,
  },{
    key: "4",
    name: "append",
    expl: "后置标签",
    type: `-`,
  },
]);

const data3 = reactive([
  {
    key: "1",
    name: "invisible",
    expl: "是否显示可见按钮",
    type: `boolean`,
    normal: "true",
  },
]);

const data4 = reactive([
  {
    key: "1",
    name: "button",
    expl: "是否为后置按钮模式",
    type: `boolean`,
    normal: "false",
  },{
    key: "2",
    name: "buttonDefine",
    expl: "是否自定义按钮内容",
    type: `boolean`,
    normal: "false",
  },{
    key: "3",
    name: "loading",
    expl: "是否为加载中状态",
    type: `boolean`,
    normal: "false",
  }
]);
const data5 = reactive([
  {
    key: "1",
    name: "define",
    expl: "自定义按钮下的内容",
    type: `-`,
  }
]);
const data6 = reactive([
  {
    key: "1",
    name: "search",
    expl: "点击搜索图标或按钮时触发",
    type: `value`,
  }
]);


//input内容
const yike = ref([]);
const yk="逸刻时光只读";

</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Input 输入框</Title>
      <Paragraph>基本表单组件,用于文本内容输入。</Paragraph>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <Input v-model="yike[0]" placeholder="请输入" allowClear />
    </CaseCard>
    <CaseCard :title="datas[1].title" :note="datas[1].note" :code="datas[1].code">
      <space direction="vertical">
        <Input placeholder="不可操作" disabled />
        <Input v-model="yk" readonly/>
        <Input v-model="yike[2]" placeholder="错误输入框" error />
      </space>
    </CaseCard>
    <CaseCard :title="datas[2].title" :note="datas[2].note" :code="datas[2].code">
      <space direction="vertical">
        <Input placeholder="请输入" v-model="yike[3]" size="s" />
        <Input placeholder="请输入" v-model="yike[4]" size="m" />
        <Input placeholder="请输入" v-model="yike[5]" size="l" />
        <Input placeholder="请输入" v-model="yike[6]" size="xl" />
      </space>
    </CaseCard>
    <CaseCard :title="datas[3].title" :note="datas[3].note" :code="datas[3].code">
      <space direction="vertical">
        <Input placeholder="请输入" v-model="yike[7]" allowClear>
        <template #prefix>
          <Icon name="yk-touxiang1" />
        </template>
        </Input>
        <Input placeholder="请输入" v-model="yike[8]" allowClear>
        <template #suffix>
          <Icon name="yk-tianxie" />
        </template>
        </Input>
      </space>
    </CaseCard>
    <CaseCard :title="datas[4].title" :note="datas[4].note" :code="datas[4].code">
      <space direction="vertical">
        <Input placeholder="请输入" v-model="yike[9]" allowClear>
        <template #prepend>
          <Icon name="yk-tianxie" />
        </template>
        </Input>
        <Input placeholder="请输入" v-model="yike[10]" allowClear>
        <template #append>
          <p>¥</p>
        </template>
        </Input>
      </space>
    </CaseCard>
    <CaseCard :title="datas[5].title" :note="datas[5].note" :code="datas[5].code">
      <Input v-model="yike[12]" placeholder="请输入" :maxLength="12" showLimit />
    </CaseCard>
    <CaseCard :title="datas[6].title" :note="datas[6].note" :code="datas[6].code">
      <space direction="vertical">
        <InputSearch v-model="yike[13]" placeholder="请输入" allowClear />
        <InputSearch v-model="yike[14]" placeholder="请输入" allowClear button />
      </space>
    </CaseCard>
    <CaseCard :title="datas[7].title" :note="datas[7].note" :code="datas[7].code">
      <space direction="vertical">
        <InputSearch v-model="yike[15]" placeholder="请输入" allowClear buttonDefine>
          <template #define>search</template>
        </InputSearch>
        <InputSearch v-model="yike[16]" placeholder="请输入" allowClear buttonDefine>
          <template #define>
            <Icon name="yk-sousuo" /><span style="paddingLeft:4px;">搜索</span>
          </template>
        </InputSearch>
      </space>
    </CaseCard>
    <CaseCard :title="datas[8].title" :note="datas[8].note" :code="datas[8].code">
      <space direction="vertical">
        <InputSearch v-model="yike[13]" loading />
        <InputSearch v-model="yike[14]" button loading />
      </space>
    </CaseCard>
    <CaseCard :title="datas[9].title" :note="datas[9].note" :code="datas[9].code">
      <InputPassword v-model="yike[17]" placeholder="请输入" allowClear />
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Input . Props</Title>
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Input . Events</Title>
      <div class="unit-table">
        <Table :data="data1" :columns="columns1"></Table>
      </div>
      <Title :level="4">Input . Slots</Title>
      <div class="unit-table">
        <Table :data="data2" :columns="columns2"></Table>
      </div>
      <Title :level="4">InputPassword . Props</Title>
      <div class="unit-table">
        <Table :data="data3" :columns="columns"></Table>
      </div>
      <Title :level="4">InputSearch . Props</Title>
      <div class="unit-table">
        <Table :data="data4" :columns="columns"></Table>
      </div>
      <Title :level="4">InputSearch . Events</Title>
      <div class="unit-table">
        <Table :data="data6" :columns="columns1"></Table>
      </div>
      <Title :level="4">InputSearch . Slots</Title>
      <div class="unit-table">
        <Table :data="data5" :columns="columns2"></Table>
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