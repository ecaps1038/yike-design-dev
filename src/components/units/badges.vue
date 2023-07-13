<script setup lang="ts">
import { reactive, ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";
import "@/yike-design/assets/font/line/iconfont.js";
import "@/yike-design/assets/font/surface/iconfont.js";
import { Avatar } from "@/yike-design";

const count = ref([12, 4, 234, 108])

//测试徽标的变化
const changeCount = (n: number) => {
  count.value[n] = 0;
  console.log(n)
}

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "只需要指定 count 数值，即可显示徽标",
    code: `<Space :size="32">
  <Badge :count="12" :border="0">
    <Avatar shape="square"></Avatar>
  </Badge>
  <Badge :count="23" dot>
    <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png" shape="square">
    </Avatar>
  </Badge>
  <Badge :count="124">
    <Avatar :style="{ backgroundColor: '#14a9f8' }" shape="square"></Avatar>
  </Badge>
  <Badge :count="108" :max="120">
    <Avatar icon="yike-touxiang" shape="square"></Avatar>
  </Badge>
</Space>`,
  },
  {
    title: "独立使用",
    note: "如果没有包括内容，将会独立展示徽标",
    code: `<Space :size="32">
  <Badge :count="12"></Badge>
  <Badge :count="2" type="warning"></Badge>
  <Badge :count="123"></Badge>
</Space>`,
  },
  {
    title: "小红点 dot",
    note: "设置 dot，即可只显示小红点而不显示数字。count > 0 时才显示。",
    code: `<Space :size="32" aline="center">
  <Badge dot :count="12">
    <Icon name="yk-lingdang"/>
  </Badge>
  <Badge dot :count="12" type="primary">
    <Icon name="yike-lingdang"/>
  </Badge>
  <Badge dot :count="12">
    <Text>文字角标</Text>
  </Badge>
</Space>`,
  },
  {
    title: "最大值 max",
    note: "设置 max，可以限制最大显示的徽标数值，超过将会加 + 后缀。max 默认为 99。",
    code: `<Space :size="32">
  <Badge :count="13" :max="12">
    <Avatar shape="square"></Avatar>
  </Badge>
  <Badge :count="120">
    <Avatar shape="square">
    </Avatar>
  </Badge>
  <Badge :count="123" :max="120">
    <Avatar shape="square"></Avatar>
  </Badge>
</Space>`,
  },
  {
    title: "边框宽度 border",
    note: "设置 border，可以设置徽标边框大小，。border 默认为 2。",
    code: `<Space :size="32">
  <Badge :count="16" :border="0">
    <Avatar shape="square"></Avatar>
  </Badge>
  <Badge :count="120" :border="1">
    <Avatar shape="square">
    </Avatar>
  </Badge>
  <Badge :count="123">
    <Avatar shape="square"></Avatar>
  </Badge>
</Space>`,
  },{
    title: "状态点 status",
    note: "设置 status，可以得到不同的状态点。default - 默认 processing - 进行中 success - 成功 warning - 提醒 error - 错误。",
    code: `<Space :size="32">
  <Badge status></Badge>
  <Badge status type="primary"></Badge>
  <Badge status type="success"></Badge>
  <Badge status type="warning"></Badge>
  <Badge status type="danger"></Badge>
</Space>`,
  },{
    title: "颜色 color",
    note: "我们提供多种预设色彩的徽标样式。如果预设值不能满足需求，color 字段也可以设置自定义色值。",
    code: `<Space :size="32">
  <Badge status color="#B71DE8" text="#B71DE8"></Badge>
  <Badge status color="#00B42A" text="#00B42A"></Badge>
  <Badge status color="#FA5247" text="#FA5247"></Badge>
</Space>`,
  },
  {
    title: "动画效果",
    note: "当 count 改变时候存在动画效果，可以点击下列头像试一试。",
    code: `...js
const count = ref([12, 4, 234, 108])
const changeCount = (n: number) => {
  count.value[n] = 0;
  console.log(n)
}

... html
<Space :size="32">
  <Badge :count="count[0]" :border="0" @click="changeCount(0)">
    <Avatar shape="square"></Avatar>
  </Badge>
  <Badge :count="count[1]" dot @click="changeCount(1)">
    <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png" shape="square">
    </Avatar>
  </Badge>
  <Badge :count="count[2]" @click="changeCount(2)">
    <Avatar :style="{ backgroundColor: '#14a9f8' }" shape="square"></Avatar>
  </Badge>
  <Badge :count="count[3]" @click="changeCount(3)">
    <Avatar icon="yike-touxiang" shape="square"></Avatar>
  </Badge>
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
    name: "count",
    expl: "徽标显示的数字",
    type: `number`,
    normal: "0",
  },
  {
    key: "2",
    name: "dot",
    expl: "显示为小红点",
    type: `boolean`,
    normal: "false",
  },
  {
    key: "3",
    name: "max",
    expl: "徽标最大值",
    type: `number`,
    normal: "99",
  },
  {
    key: "4",
    name: "border",
    expl: "徽标边框宽度",
    type: `number`,
    normal: "2",
  },{
    key: "5",
    name: "status",
    expl: "徽标的状态类型",
    type: `'default' | 'processing' | 'success' | 'warning' | 'danger'`,
    normal: "-",
  },{
    key: "6",
    name: "color",
    expl: "自定义颜色",
    type: `string`,
    normal: "-",
  },{
    key: "7",
    name: "text",
    expl: "status下后面的文字",
    type: `string`,
    normal: "-",
  },
  
]);

</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Badge 徽标数</Title>
      <Paragraph>一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。</Paragraph>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <Space :size="32">
        <Badge :count="12" :border="0">
          <Avatar shape="square"></Avatar>
        </Badge>
        <Badge :count="23" dot>
          <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png" shape="square">
          </Avatar>
        </Badge>
        <Badge :count="124">
          <Avatar :style="{ backgroundColor: '#14a9f8' }" shape="square"></Avatar>
        </Badge>
        <Badge :count="108" :max="120">
          <Avatar icon="yike-touxiang" shape="square"></Avatar>
        </Badge>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[1].title" :note="datas[1].note" :code="datas[1].code">
      <Space :size="32">
        <Badge :count="12"></Badge>
        <Badge :count="2" type="warning"></Badge>
        <Badge :count="123"></Badge>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[2].title" :note="datas[2].note" :code="datas[2].code">
      <Space :size="32" aline="center">
        <Badge dot :count="12">
          <Icon name="yk-lingdang" />
        </Badge>
        <Badge dot :count="12" type="primary">
          <Icon name="yike-lingdang" />
        </Badge>
        <Badge dot :count="12">
          <Text>文字角标</Text>
        </Badge>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[3].title" :note="datas[3].note" :code="datas[3].code">
      <Space :size="32">
        <Badge :count="13" :max="12">
          <Avatar shape="square"></Avatar>
        </Badge>
        <Badge :count="120">
          <Avatar shape="square">
          </Avatar>
        </Badge>
        <Badge :count="123" :max="120">
          <Avatar shape="square"></Avatar>
        </Badge>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[4].title" :note="datas[4].note" :code="datas[4].code">
      <Space :size="32">
        <Badge :count="16" :border="0">
          <Avatar shape="square"></Avatar>
        </Badge>
        <Badge :count="120" :border="1">
          <Avatar shape="square">
          </Avatar>
        </Badge>
        <Badge :count="123">
          <Avatar shape="square"></Avatar>
        </Badge>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[5].title" :note="datas[5].note" :code="datas[5].code">
      <Space :size="32">
        <Badge status></Badge>
        <Badge status type="primary"></Badge>
        <Badge status type="success"></Badge>
        <Badge status type="warning"></Badge>
        <Badge status type="danger"></Badge>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[6].title" :note="datas[6].note" :code="datas[6].code">
      <Space :size="32">
        <Badge status color="#B71DE8" text="#B71DE8"></Badge>
        <Badge status color="#00B42A" text="#00B42A"></Badge>
        <Badge status color="#FA5247" text="#FA5247"></Badge>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[7].title" :note="datas[7].note" :code="datas[7].code">
      <Space :size="32">
        <Badge :count="count[0]" :border="0" @click="changeCount(0)">
          <Avatar shape="square"></Avatar>
        </Badge>
        <Badge :count="count[1]" dot @click="changeCount(1)">
          <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png" shape="square">
          </Avatar>
        </Badge>
        <Badge :count="count[2]" @click="changeCount(2)">
          <Avatar :style="{ backgroundColor: '#14a9f8' }" shape="square"></Avatar>
        </Badge>
        <Badge :count="count[3]" @click="changeCount(3)">
          <Avatar icon="yike-touxiang" shape="square"></Avatar>
        </Badge>
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