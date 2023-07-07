<script setup lang="ts">
import { reactive } from 'vue'
import CaseCard from '@/components/CaseCard.vue'
import '@/assets/font/line/iconfont.js'
import '@/assets/font/surface/iconfont.js'

//说明部分
let datas = [
  {
    title: '基本用法',
    note: 'space 组件以横向排列间距为基本用法',
    code: `<yk-space>
  <yk-button>第一个按钮</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button shape="circle"><Icon name="yk-jiahao" /></yk-button>
</yk-space>`,
  },
  {
    title: '垂直 direction',
    note: 'yk-space 组件可以设置垂直方向排列的间距。',
    code: `<yk-space direction="vertical">
  <yk-button>第一个按钮</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button shape="circle"><Icon name="yk-jiahao" /></yk-button>
</yk-space>`,
  },
  {
    title: '水平尺寸 size',
    note: '内置4个尺寸，分别是 s - 4px , m - 8px , l - 16px , xl -24px ,默认为 m ,也可以输入数字自定义尺寸',
    code: `<yk-title :level="5">size="s"</yk-title>
<yk-space size="s">
  <yk-button>按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button>按钮3</yk-button>
</yk-space>
<yk-title :level="5">size="m"</yk-title>
<yk-space size="m">
  <yk-button>按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button>按钮3</yk-button>
</yk-space>
<yk-title :level="5">size="l"</yk-title>
<yk-space size="l">
  <yk-button>按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button>按钮3</yk-button>
</yk-space>
<yk-title :level="5">size="xl"</yk-title>
<yk-space size="xl">
  <yk-button>按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button>按钮3</yk-button>
</yk-space>
<yk-title :level="5">自定义 :size="40"</yk-title>
<yk-space :size="40">
  <yk-button>按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button>按钮3</yk-button>
</yk-space>`,
  },
  {
    title: '垂直尺寸 rsize',
    note: '与垂直尺寸相同内置4个尺寸,默认为 m ,也可以输入数字自定义尺寸',
    code: `<yk-title :level="5">size="s"</yk-title>
<yk-space rsize="s" direction="vertical">
  <yk-button>按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button>按钮3</yk-button>
</yk-space>
<yk-title :level="5">size="m"</yk-title>
<yk-space rsize="s" direction="vertical">
  <yk-button>按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button>按钮3</yk-button>
</yk-space>
`,
  },
  {
    title: '对齐 aline',
    note: '内置 4 种对齐方式，分别为 start center end baseline，在水平模式下默认为 start。',
    code: `<yk-title :level="5">默认上对其</yk-title>
<yk-space>
  <yk-button size="s">按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button size="xl">按钮3</yk-button>
</yk-space>
<yk-title :level="5">aline="center"</yk-title>
<yk-space aline="center">
  <yk-button size="s">按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button size="xl">按钮3</yk-button>
</yk-space>
<yk-title :level="5">aline="end"</yk-title>
<yk-space aline="end">
  <yk-button size="s">按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button size="xl">按钮3</yk-button>
</yk-space>
<yk-title :level="5">aline="baseline"</yk-title>
<yk-space aline="baseline">
  <yk-button size="s">按钮1</yk-button>
  <yk-button>按钮2</yk-button>
  <yk-button size="xl">按钮3</yk-button>
</yk-space>`,
  },
  {
    title: '换行 wrap',
    note: '当一行放不下时自动换行',
    code: ` <yk-space wrap>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
  <yk-button>按钮</yk-button>
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
    name: 'direction',
    expl: '间距方向',
    type: `'vertical' ｜ 'horizontal'`,
    normal: 'horizontal',
  },
  {
    key: '2',
    name: 'size',
    expl: '水平尺寸',
    type: `'s' ｜ 'm' | 'l' | 'xl' | number`,
    normal: 'l',
  },
  {
    key: '3',
    name: 'rsize',
    expl: '垂直尺寸',
    type: `'s' ｜ 'm' | 'l' | 'xl' | number`,
    normal: 'l',
  },
  {
    key: '4',
    name: 'aline',
    expl: '对齐',
    type: `'start' ｜ 'center' | 'end' | 'baseline'`,
    normal: 'satrt',
  },
  {
    key: '5',
    name: 'warp',
    expl: '换行',
    type: `boolean`,
    normal: 'false',
  },
])
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <yk-title :level="2">yk-space 间距</yk-title>
      <Paragraph>用来设置个元素之间的间距。</Paragraph>
    </div>
    <CaseCard
      :title="datas[0].title"
      :note="datas[0].note"
      :code="datas[0].code"
    >
      <yk-space>
        <yk-button>第一个按钮</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button shape="circle">
          <Icon name="yk-jiahao" />
        </yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[1].title"
      :note="datas[1].note"
      :code="datas[1].code"
    >
      <yk-space direction="vertical">
        <yk-button>第一个按钮</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button shape="circle">
          <Icon name="yk-jiahao" />
        </yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[2].title"
      :note="datas[2].note"
      :code="datas[2].code"
    >
      <yk-title :level="5">size="s"</yk-title>
      <yk-space size="s">
        <yk-button>按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button>按钮3</yk-button>
      </yk-space>
      <yk-title :level="5">size="m"</yk-title>
      <yk-space size="m">
        <yk-button>按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button>按钮3</yk-button>
      </yk-space>
      <yk-title :level="5">size="l"</yk-title>
      <yk-space size="l">
        <yk-button>按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button>按钮3</yk-button>
      </yk-space>
      <yk-title :level="5">size="xl"</yk-title>
      <yk-space size="xl">
        <yk-button>按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button>按钮3</yk-button>
      </yk-space>
      <yk-title :level="5">自定义 :size="40"</yk-title>
      <yk-space :size="40">
        <yk-button>按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button>按钮3</yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[3].title"
      :note="datas[3].note"
      :code="datas[3].code"
    >
      <yk-title :level="5">rsize="s"</yk-title>
      <yk-space rsize="s" direction="vertical">
        <yk-button>按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button>按钮3</yk-button>
      </yk-space>
      <yk-title :level="5">rsize="m"</yk-title>
      <yk-space rsize="m" direction="vertical">
        <yk-button>按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button>按钮3</yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[4].title"
      :note="datas[4].note"
      :code="datas[4].code"
    >
      <yk-title :level="5">默认上对其</yk-title>
      <yk-space>
        <yk-button size="s">按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button size="xl">按钮3</yk-button>
      </yk-space>
      <yk-title :level="5">aline="center"</yk-title>
      <yk-space aline="center">
        <yk-button size="s">按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button size="xl">按钮3</yk-button>
      </yk-space>
      <yk-title :level="5">aline="end"</yk-title>
      <yk-space aline="end">
        <yk-button size="s">按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button size="xl">按钮3</yk-button>
      </yk-space>
      <yk-title :level="5">aline="baseline"</yk-title>
      <yk-space aline="baseline">
        <yk-button size="s">按钮1</yk-button>
        <yk-button>按钮2</yk-button>
        <yk-button size="xl">按钮3</yk-button>
      </yk-space>
    </CaseCard>
    <CaseCard
      :title="datas[5].title"
      :note="datas[5].note"
      :code="datas[5].code"
    >
      <yk-space wrap>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
        <yk-button>按钮</yk-button>
      </yk-space>
    </CaseCard>
    <div class="api">
      <yk-title :level="3">API</yk-title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <yk-table :data="data" :columns="columns"></yk-table>
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
