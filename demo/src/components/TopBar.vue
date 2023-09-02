<template>
  <div class="top-bar">
    <a class="logo" href="/">
      <img src="@/assets/icon/logo.svg" />
      <span class="name">Yike Design 开发版</span>
    </a>
    <yk-space class="navs" :size="24" align="center">
      <a class="nav-item" :href="Links.design" target="_blank">UI设计稿</a>
      <a class="nav-item" :href="Links.task" target="_blank">任务文档</a>
      <router-link
        v-for="(link, path) in navLinks"
        :key="path"
        :to="path"
        class="nav-item"
      >
        {{ link }}
      </router-link>
      <a class="nav-item" :href="Links.home" target="_blank">主站</a>
      <a class="nav-item" :href="Links.github" target="_blank">
        <icon-github-fill />
      </a>
      <a class="nav-item"><yk-theme /></a>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'

const Links = {
  home: 'http://www.huohuo90.com',
  github: 'https://github.com/ecaps1038/yike-design-dev',
  task: 'https://dwawvfgxvzk.feishu.cn/wiki/T8D3w5VqbinQr5kLNoVcrDQKnbg?table=tblT9WqhCE0EWKfP&view=vewXxBNTOK',
  design:
    'https://www.figma.com/file/EMPOindzRJTKt1Gx6Egojq/Yike-design?type=design&node-id=0%3A278&mode=design&t=buLeC3MzFSkXagtR-1',
}

const navLinks = {
  '/developStandard': '开发规范',
  '/design': '设计',
  '/develop': '开发',
  '/module': '组件',
}

provide('size', 'm')
provide('shape', 'circle')
</script>

<style lang="less" scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  width: 100%;
  height: 60px;
  border-bottom: 1px solid @line-color-s;
  background-color: @bg-color-l;
  transition: all @animats;
  box-sizing: border-box;
}

.logo {
  display: flex;
  justify-content: center;
  cursor: pointer;

  img {
    width: 32px;
  }

  .name {
    padding-left: 12px;
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
    color: @font-color-l;
    transition: color @animats;
    vertical-align: top;
  }
}

.navs {
  display: flex;

  .nav-item {
    padding: 5px 8px;
    border-radius: 4px;
    text-decoration: none;
    color: @font-color-l;
    cursor: pointer;
  }

  .nav-item:hover {
    background-color: @bg-color-ss;
  }
}
</style>
