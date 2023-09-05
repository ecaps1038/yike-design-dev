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
        <IconLogoBackup5Fill class="bg-logo" />
        <p class="title">YIKE DESIGN</p>
        <p class="slogan">包容万物，从源头出发，一切从简</p>
      </div>
      <yk-space class="bt">
        <yk-button size="l" @click="goPage('develop')">开始使用</yk-button>
        <yk-button type="secondary" size="l" @click="goPage('design')">
          设计文件
        </yk-button>
      </yk-space>
      <IconYike1Outline class="sign" @click="goPage('hh')" />
    </div>
  </main>
</template>

<style lang="less" scoped>
.home {
  .main {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;

    .sign {
      position: absolute;
      bottom: 60px;
      width: 56px;
      height: 56px;
    }

    .bt {
      padding-top: 40px;
    }
  }
}

.logo {
  // border:1px solid red;
  position: relative;
  margin-top: -200px;
  width: 940px;
  height: 220px;

  .bg-logo {
    position: absolute;
    top: 0;
    left: 280px;
    width: 380px;
    height: 220px;
    color: @bg-color-m;
    transition: color @animats;
  }

  .slogan {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }

  .title {
    padding-top: 42px;
    padding-bottom: 16px;
    padding-left: 20px;
    font-size: 68px;
    font-weight: 600;
    text-align: center;
    line-height: 90px;
    letter-spacing: 36px;
  }
}
</style>
