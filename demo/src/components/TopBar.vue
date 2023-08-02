<template>
  <div class="top-bar">
    <div class="logo" @click="goIndex">
      <img src="@/assets/icon/logo.svg" />
      <span class="name">Yike Design 开发版</span>
    </div>
    <yk-space class="net" :size="30" align="center">
      <a :href="uiUrl" target="_blank">UI设计稿</a>
      <a :href="taskUrl" target="_blank">任务文档</a>
      <router-link to="/developStandard">开发规范</router-link>
      <router-link to="/design">设计</router-link>
      <router-link to="/develop">开发</router-link>
      <router-link to="/module">组件</router-link>
      <a href="http://www.huohuo90.com" target="_blank">主站</a>
      <a href="https://github.com/ecaps1038/yike-design-dev" target="_blank">
        <icon-github-fill />
      </a>
      <a><yk-theme></yk-theme></a>
      <yk-avatar size="m" :img-url="avatarImgUrl"></yk-avatar>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'

// 任务文档url
const taskUrl = ref(
  'https://dwawvfgxvzk.feishu.cn/wiki/T8D3w5VqbinQr5kLNoVcrDQKnbg?table=tblT9WqhCE0EWKfP&view=vewXxBNTOK',
)
// 任务文档url
const uiUrl = ref('https://codesign.qq.com/s/6W3G0m4m8q9lOwL')
// 头像图片地址
const avatarImgUrl = ref(
  'https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png',
)

//页面跳转
const router = useRouter()
const goIndex = (): void => {
  router.push({ path: '/' })
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

  box-sizing: border-box;
  transition: all @animats;
}

.top-bar .logo {
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
    vertical-align: top;
    color: @font-color-l;
    transition: color @animats;
  }
}

.top-bar a {
  padding: 5px 8px;
  text-decoration: none;
  color: @font-color-l;
  cursor: pointer;

  &:hover {
    border-radius: @radius-s;
    background-color: @bg-color-s;
  }
}

.top-bar .support {
  position: fixed;
  top: 50px;
  right: 30px;
  display: none;
  width: 490px;
  height: 340px;
  border-radius: @radius-m;
  text-align: center;
  background-color: @bg-color-l;
  box-shadow: 0 4px 48px rgb(0 0 0 / 12%);

  .zz-tp {
    margin: 15px;
    width: 200px;
  }

  p {
    padding-top: 20px;
    font-size: 16px;
    line-height: 40px;
  }
}

.top-bar .net {
  display: flex;

  .yk-icon {
    width: 16px;
    height: 16px;
  }

  .router-link-active {
    font-weight: 600;
    color: @pcolor;
  }
}
</style>
