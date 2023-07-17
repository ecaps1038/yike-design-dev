<template>
  <div class="top-bar">
    <div class="logo" @click="goIndex">
      <img src="@/assets/icon/logo.svg" />
      <span class="name">Yike Design 开发版</span>
    </div>
    <yk-space class="net" :size="40" align="center">
      <a href="https://dwawvfgxvzk.feishu.cn/wiki/PDRLwW2BdiUh07kBs86cLYfjnic">
        开发规范
      </a>
      <a href="https://docs.qq.com/sheet/DZEd4ZFlTeGx2UkJa?tab=BB08J2">
        任务文档
      </a>
      <router-link to="/design">设计</router-link>
      <router-link to="/develop">开发</router-link>
      <router-link to="/module">组件</router-link>
      <a href="http://www.huohuo90.com">主站</a>
      <div class="zz">
        赞助
        <div class="support">
          <p>感谢您的赞助，您的支持是我最大的动力～</p>
          <img class="zz-tp" src="@/assets/images/wx.png" />
          <img class="zz-tp" src="@/assets/images/zfb.png" />
        </div>
      </div>
      <a href="https://github.com/ecaps1038/yike-design-dev">
        <yk-icon name="yike-github" class="github" />
      </a>
      <yk-theme class="nav"></yk-theme>
      <yk-avatar
        size="m"
        class="nav"
        img-url="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"
      ></yk-avatar>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'

const dark = ref(false)
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
  height: 60px;
  width: 100%;
  background-color: @bg-color-l;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid @line-color-s;
  transition: all @animats;

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
      vertical-align: top;
      color: @font-color-l;
      transition: color @animats;
    }
  }

  .net {
    display: flex;
    align-items: center;

    a,
    .zz {
      color: @font-color-l;
      text-decoration: none;
      min-width: 24px;
      line-height: 60px;
    }

    .zz {
      cursor: pointer;

      .support {
        position: fixed;
        right: 30px;
        top: 50px;
        width: 490px;
        height: 340px;
        background-color: @bg-color-l;
        box-shadow: 0 4px 48px rgba(0, 0, 0, 0.12);
        border-radius: @radius-m;
        text-align: center;
        display: none;
        .zz-tp {
          width: 200px;
          margin: 15px;
        }
        p {
          font-size: 16px;
          padding-top: 20px;
          line-height: 40px;
        }
      }

      &:hover {
        .support {
          display: block;
        }
      }
    }

    .github {
      font-size: 16px;
    }

    .router-link-active {
      font-weight: 600;
      color: @pcolor;
    }
  }
}
</style>
