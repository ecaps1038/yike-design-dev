<script setup lang="ts">
import { reactive } from "vue";
import CaseCard from "@/components/CaseCard.vue";
import "@/yike-design/assets/font/line/iconfont.js";
import "@/yike-design/assets/font/surface/iconfont.js";
import { Avatar } from "@/yike-design";

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "头像的基本用法，实际中使用图片为主",
    code: `<Space size="l">
  <Avatar></Avatar>
  <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
  <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
  <Avatar icon="yike-touxiang"></Avatar>
</Space>`,
  },
  {
    title: "大小 size",
    note: "通过设置 size 字段，调节头像大小，默认大小为40px ，当然可以直接输入数字。",
    code: `<Space size="l" aline="center">
  <Avatar :size="100"></Avatar>
  <Avatar size="xl"></Avatar>
  <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
  <Avatar  size="m" icon="yike-touxiang"></Avatar>
  <Avatar size="s"></Avatar>
</Space>`,
  },
  {
    title: "形状 shape",
    note: "头像默认为圆形，可以设置为圆角方形。",
    code: `<Space size="l">
  <Avatar></Avatar>
  <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
  <Avatar :style="{ backgroundColor: '#14a9f8' }" shape="square"></Avatar>
  <Avatar icon="yike-touxiang" shape="square"></Avatar>
</Space>`,
  },
  {
    title: "AvatarGroup 头像组",
    note: "使用 AvatarGroup 可以使用头像组功能，可通过 size 指定头像的大小，可通过 max 指定头像显示最多个数,默认3个。",
    code: `<space :size="48" aline="center">
  <AvatarGroup :size="48">
    <Avatar></Avatar>
    <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
    <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
    <Avatar :style="{ backgroundColor: '#1FB4A2' }" icon="yike-touxiang"></Avatar>
  </AvatarGroup>
  <AvatarGroup size="m">
    <Avatar></Avatar>
    <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
    <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
    <Avatar :style="{ backgroundColor: '#1FB4A2' }" icon="yike-touxiang"></Avatar>
  </AvatarGroup>
  <AvatarGroup size="s" :max="6">
    <Avatar></Avatar>
    <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
    <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
    <Avatar :style="{ backgroundColor: '#1FB4A2' }" icon="yike-touxiang"></Avatar>
    <Avatar :style="{ backgroundColor: '#1FB4A2' }" icon="yike-touxiang"></Avatar>
  </AvatarGroup>
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
    name: "size",
    expl: "头像大小",
    type: `'s' ｜ 'm' | 'l' | 'xl' | number`,
    normal: "l",
  },
  {
    key: "2",
    name: "icon",
    expl: "图标头像",
    type: `'icon-name'`,
    normal: "yk-touxiang1",
  },
  {
    key: "3",
    name: "imgUrl",
    expl: "图片头像",
    type: `-`,
    normal: "-",
  },
  {
    key: "4",
    name: "shape",
    expl: "头像形状",
    type: `'circle' ｜ 'square'`,
    normal: "circle",
  },
]);
const data1 = reactive([
  {
    key: "1",
    name: "size",
    expl: "头像大小",
    type: `'s' ｜ 'm' | 'l' | 'xl' | number`,
    normal: "l",
  },
  {
    key: "2",
    name: "max",
    expl: "头像组最多显示个数",
    type: `number`,
    normal: "3",
  },
  {
    key: "4",
    name: "shape",
    expl: "头像形状",
    type: `'circle' ｜ 'square'`,
    normal: "circle",
  },
]);
</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Avatar 头像</Title>
      <Paragraph>用于头像显示，可以设置头像形状、内容可以是图片、图标、颜色。</Paragraph>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <Space size="l">
        <Avatar></Avatar>
        <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
        <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
        <Avatar icon="yike-touxiang"></Avatar>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[1].title" :note="datas[1].note" :code="datas[1].code">
      <Space size="l" aline="center">
        <Avatar :size="100"></Avatar>
        <Avatar size="xl"></Avatar>
        <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
        <Avatar size="m" icon="yike-touxiang"></Avatar>
        <Avatar size="s"></Avatar>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[2].title" :note="datas[2].note" :code="datas[2].code">
      <Space size="l">
        <Avatar></Avatar>
        <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
        <Avatar :style="{ backgroundColor: '#14a9f8' }" shape="square"></Avatar>
        <Avatar icon="yike-touxiang" shape="square"></Avatar>
      </Space>
    </CaseCard>
    <CaseCard :title="datas[3].title" :note="datas[3].note" :code="datas[3].code">
      <space :size="48" aline="center">
        <AvatarGroup :size="48">
          <Avatar></Avatar>
          <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
          <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
          <Avatar :style="{ backgroundColor: '#1FB4A2' }" icon="yike-touxiang"></Avatar>
        </AvatarGroup>
        <AvatarGroup size="m">
          <Avatar></Avatar>
          <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
          <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
          <Avatar :style="{ backgroundColor: '#1FB4A2' }" icon="yike-touxiang"></Avatar>
        </AvatarGroup>
        <AvatarGroup size="s" :max="6">
          <Avatar></Avatar>
          <Avatar imgUrl="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"></Avatar>
          <Avatar :style="{ backgroundColor: '#14a9f8' }"></Avatar>
          <Avatar :style="{ backgroundColor: '#1FB4A2' }" icon="yike-touxiang"></Avatar>
          <Avatar :style="{ backgroundColor: '#1FB4A2' }" icon="yike-touxiang"></Avatar>
        </AvatarGroup>
      </space>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Avatar</Title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">AvatarGroup</Title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <Table :data="data1" :columns="columns"></Table>
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