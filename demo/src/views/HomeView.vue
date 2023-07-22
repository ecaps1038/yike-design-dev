<script setup lang="ts">
import { useRouter } from 'vue-router'

//获取屏幕body高度
let bodyHeight = document.body.clientHeight - 60

//页面跳转
const router = useRouter()
const goPage = (e: string): void => {
  router.push({ path: e })
}
</script>

<template>
  <main class="home" :style="{ height: bodyHeight + 'px' }">
    <div class="main">
      <div class="logo">
        <yk-icon name="yike-yikedesign" class="bg-logo"></yk-icon>
        <p class="title">YIKE DESIGN</p>
        <p class="slogan">包容万物，从源头出发，一切从简</p>
      </div>
      <yk-space class="bt">
        <yk-button size="l" @click="goPage('develop')">开始使用</yk-button>
        <yk-button type="secondary" size="l" @click="goPage('design')">
          设计文件
        </yk-button>
      </yk-space>
      <yk-icon name="yk-yike1" class="sign" @click="goPage('hh')"></yk-icon>
    </div>
  </main>
</template>

<style lang="less" scoped>
.home {
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    .sign {
      position: absolute;
      bottom: 60px;
      font-size: 56px;
    }
    .bt {
      padding-top: 40px;
    }
  }
}

.logo {
  margin-top: -200px;
  // border:1px solid red;
  position: relative;
  width: 940px;
  height: 220px;
  .bg-logo {
    width: 380px;
    height: 220px;
    color: @bg-color-m;
    position: absolute;
    left: 280px;
    top: 0;
    transition: color @animats;
  }
  .slogan {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .title {
    font-size: 68px;
    line-height: 90px;
    text-align: center;
    font-weight: 600;
    padding-top: 42px;
    padding-left: 20px;
    padding-bottom: 16px;
    letter-spacing: 36px;
  }
}
</style>
