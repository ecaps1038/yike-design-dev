<script setup lang="ts">
import { reactive } from 'vue'
import CaseCard from '@/components/CaseCard.vue'

//说明部分
let datas = [
  {
    title: '按钮类型 type',
    note: '按钮有三种类型：主按钮、次按钮、线框按钮。主按钮在同一个操作区域建议最多出现一次。',
    code: `<yk-button>主要按钮</yk-button>
<yk-button type="sceondary">次要按钮</yk-button>
<yk-button type="outline">线框按钮</yk-button>`,
  },
  {
    title: '按钮尺寸 size',
    note: '按钮分为：s、m、l、xl 四种尺寸。高度分别为：24px、32px、36px、48px。默认尺寸为 l。',
    code: `<yk-space>
  <yk-button size="s">按钮</yk-button>
  <yk-button size="m">按钮</yk-button>
  <yk-button size="l">按钮</yk-button>
  <yk-button size="xl">按钮</yk-button>
</yk-space>`,
  },
  {
    title: '按钮形状 shape',
    note: '按钮分为默认形状、circle 圆形、round 全圆角、square 正方形四种形状。',
    code: `<yk-button>默认形状</yk-button>
<yk-button shape="round">全圆角</yk-button>
<yk-button shape="circle"><Icon name="yk-jiahao"/></yk-button>
<yk-button shape="square"><Icon name="yk-jiahao"/></yk-button>`,
  },
  {
    title: '图标按钮 icon',
    note: '自己插入图标，无论前后',
    code: `<yk-button>加入<Icon name="yk-jiahao" style="marginLeft:4px;"/></yk-button>
<yk-button><Icon name="yk-shanchu" style="marginRight:4px;"/>删除</yk-button>
<yk-button shape="circle"><Icon name="yk-jiahao"/></yk-button>`,
  },
  {
    title: '按钮状态 status',
    note: '按钮的状态分为 默认、primary 主要、success 成功、warning 警告、danger 危险五种，可以与按钮类型同时使用。',
    code: ` <yk-space direction="vertical">
  <yk-space>
    <yk-button>主要按钮</yk-button>
    <yk-button type="sceondary">次要按钮</yk-button>
    <yk-button type="outline">线框按钮</yk-button>
  </yk-space>
  <yk-space>
    <yk-button status="primary">主要按钮</yk-button>
    <yk-button type="sceondary" status="primary">次要按钮</yk-button>
    <yk-button type="outline" status="primary">线框按钮</yk-button>
  </yk-space>
  <yk-space>
    <yk-button status="success">主要按钮</yk-button>
    <yk-button type="sceondary" status="success">次要按钮</yk-button>
    <yk-button type="outline" status="success">线框按钮</yk-button>
  </yk-space>
  <yk-space>
    <yk-button status="warning">主要按钮</yk-button>
    <yk-button type="sceondary" status="warning">次要按钮</yk-button>
    <yk-button type="outline" status="warning">线框按钮</yk-button>
  </yk-space>
  <yk-space>
    <yk-button status="danger">主要按钮</yk-button>
    <yk-button type="sceondary" status="danger">次要按钮</yk-button>
    <yk-button type="outline" status="danger">线框按钮</yk-button>
  </yk-space>
</yk-space>`,
  },
  {
    title: '禁用状态 disabled',
    note: '按钮不可点击。',
    code: `<yk-button>加入<Icon name="yk-jiahao" style="marginLeft:4px;"/></yk-button>
<yk-button><Icon name="yk-shanchu" style="marginRight:4px;"/>删除</yk-button>
<yk-button shape="circle"><Icon name="yk-jiahao"/></yk-button>`,
  },
  {
    title: '加载中按钮 loading',
    note: '通过设置 loading 可以让按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。',
    code: `<yk-button loading>加载中</yk-button>`,
  },
  {
    title: '长按钮 long',
    note: '通过设置 long 属性，使按钮的宽度跟随容器的宽度。',
    code: `<yk-space direction="vertical" style="width:100%">
  <yk-button long status="primary">主要按钮</yk-button>
  <yk-button long type="sceondary" status="primary">次要按钮</yk-button>
  <yk-button long type="outline" status="primary">线框按钮</yk-button>
</yk-space>`,
  },
]

//api部分
const columns = [
  {
    title: '参数名',
    dataIndex: 'name',
    light: false,
  },
  {
    title: '描述',
    dataIndex: 'expl',
    light: false,
  },
  {
    title: '类型',
    dataIndex: 'type',
    light: true,
  },
  {
    title: '默认值',
    dataIndex: 'normal',
    light: false,
  },
]
const data = reactive([
  {
    key: '1',
    name: 'type',
    expl: '按钮的类型',
    type: `'primary' | 'secondary' | 'outline'`,
    normal: 'primary',
  },
  {
    key: '2',
    name: 'size',
    expl: '按钮的尺寸',
    type: `'s' | 'm' | 'l' | 'xl'`,
    normal: 'l',
  },
  {
    key: '3',
    name: 'shape',
    expl: '按钮的形状',
    type: `'round' | 'circle' | 'square'`,
    normal: '-',
  },
  {
    key: '4',
    name: 'stauts',
    expl: '按钮的状态',
    type: `'primary' | 'success' | 'warning' | 'danger'`,
    normal: '-',
  },
  {
    key: '5',
    name: 'disabled',
    expl: '按钮是否被禁用',
    type: `false | true `,
    normal: 'false',
  },
  {
    key: '6',
    name: 'loading',
    expl: '按钮是否加载中',
    type: `false | true `,
    normal: 'false',
  },
  {
    key: '7',
    name: 'long',
    expl: '按钮是否通栏',
    type: `false | true `,
    normal: 'false',
  },
])
</script>

<template>
  <main class="module">
    <div class="top-title">
      <Title :level="2">yk-button 按钮</Title>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <yk-space>
        <yk-button>主要按钮</yk-button>
        <yk-button type="sceondary">次要按钮</yk-button>
        <yk-button type="outline">线框按钮</yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <yk-space aline="center">
        <yk-button size="s">按钮</yk-button>
        <yk-button size="m">按钮</yk-button>
        <yk-button size="l">按钮</yk-button>
        <yk-button size="xl">按钮</yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <yk-space>
        <yk-button>默认形状</yk-button>
        <yk-button shape="round">全圆角</yk-button>
        <yk-button shape="circle">
          <Icon name="yk-jiahao" />
        </yk-button>
        <yk-button shape="square">
          <Icon name="yk-jiahao" />
        </yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[3].title"
      :note="datas[3].note"
      :code="datas[3].code"
    >
      <yk-space>
        <yk-button>
          加入
          <Icon name="yk-jiahao" style="marginleft: 4px" />
        </yk-button>
        <yk-button>
          <Icon name="yk-shanchu" style="marginright: 4px" />
          删除
        </yk-button>
        <yk-button shape="circle">
          <Icon name="yk-jiahao" />
        </yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[4].title"
      :note="datas[4].note"
      :code="datas[4].code"
    >
      <yk-space direction="vertical">
        <yk-space>
          <yk-button>主要按钮</yk-button>
          <yk-button type="sceondary">次要按钮</yk-button>
          <yk-button type="outline">线框按钮</yk-button>
        </yk-space>
        <yk-space>
          <yk-button status="primary">主要按钮</yk-button>
          <yk-button type="sceondary" status="primary">次要按钮</yk-button>
          <yk-button type="outline" status="primary">线框按钮</yk-button>
        </yk-space>
        <yk-space>
          <yk-button status="success">主要按钮</yk-button>
          <yk-button type="sceondary" status="success">次要按钮</yk-button>
          <yk-button type="outline" status="success">线框按钮</yk-button>
        </yk-space>
        <yk-space>
          <yk-button status="warning">主要按钮</yk-button>
          <yk-button type="sceondary" status="warning">次要按钮</yk-button>
          <yk-button type="outline" status="warning">线框按钮</yk-button>
        </yk-space>
        <yk-space>
          <yk-button status="danger">主要按钮</yk-button>
          <yk-button type="sceondary" status="danger">次要按钮</yk-button>
          <yk-button type="outline" status="danger">线框按钮</yk-button>
        </yk-space>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[5].title"
      :note="datas[5].note"
      :code="datas[5].code"
    >
      <yk-space direction="vertical">
        <yk-space>
          <yk-button disabled status="primary">主要按钮</yk-button>
          <yk-button disabled type="sceondary" status="primary">
            次要按钮
          </yk-button>
          <yk-button disabled type="outline" status="primary">
            线框按钮
          </yk-button>
        </yk-space>
        <yk-space>
          <yk-button disabled status="success">主要按钮</yk-button>
          <yk-button disabled type="sceondary" status="success">
            次要按钮
          </yk-button>
          <yk-button disabled type="outline" status="success">
            线框按钮
          </yk-button>
        </yk-space>
        <yk-space>
          <yk-button disabled status="warning">主要按钮</yk-button>
          <yk-button disabled type="sceondary" status="warning">
            次要按钮
          </yk-button>
          <yk-button disabled type="outline" status="warning">
            线框按钮
          </yk-button>
        </yk-space>
        <yk-space>
          <yk-button disabled status="danger">主要按钮</yk-button>
          <yk-button disabled type="sceondary" status="danger">
            次要按钮
          </yk-button>
          <yk-button disabled type="outline" status="danger">
            线框按钮
          </yk-button>
        </yk-space>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[6].title"
      :note="datas[6].note"
      :code="datas[6].code"
    >
      <yk-space>
        <yk-button loading>加载中</yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[7].title"
      :note="datas[7].note"
      :code="datas[7].code"
    >
      <yk-space direction="vertical" style="width: 100%">
        <yk-button long status="primary">主要按钮</yk-button>
        <yk-button long type="sceondary" status="primary">次要按钮</yk-button>
        <yk-button long type="outline" status="primary">线框按钮</yk-button>
      </yk-space>
    </CaseCard>
    <div class="api">
      <yk-title :level="3">API</yk-title>
      <yk-text type="secondary">
        通过设置 yk-button 的属性来产生不同的按钮样式，推荐顺序为：type -> size
        -> shape -> status -> disabled。
      </yk-text>
      <div class="unit-table">
        <yk-table :data="data" :columns="columns"></yk-table>
      </div>
    </div>
  </main>
</template>

<style lang="less" scoped>
.unit-table {
  width: 100%;
  // overflow: hidden;
  overflow-x: auto;
}
</style>
