<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goPage(path: string) {
  router.push({ path })
}
</script>

<template>
  <div class="main">
    <div class="logo">
      <IconLogoBackup5Fill class="bg-logo" />
      <p class="title">YIKE DESIGN</p>
      <p class="slogan">包容万物，从源头出发，一切从简</p>
    </div>
    <yk-space class="start-btns">
      <yk-button size="l" @click="goPage('develop')">开始使用</yk-button>
      <yk-button type="secondary" size="l" @click="goPage('design')">
        设计文件
      </yk-button>
    </yk-space>
    <IconYike1Outline class="sign" @click="goPage('hh')" />
    <img src="@/assets/images/bg.png" class="bg-img" />
  </div>
</template>

<style lang="less" scoped>
.main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  .sign {
    position: absolute;
    bottom: 60px;
    width: 56px;
    height: 56px;
  }

  .bg-img {
    position: absolute;
    bottom: 0;
    z-index: -1;
    width: 100%;
  }
}

.start-btns {
  padding-top: 40px;
}

.logo {
  position: relative;
  margin-top: -200px;
  width: 940px;
  height: 220px;

  .bg-logo {
    position: absolute;
    top: 0;
    left: 280px;
    z-index: -1;
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
    margin: 0;
    padding: 42px 0 16px 20px;
    font-size: 68px;
    font-weight: 600;
    text-align: center;
    line-height: 90px;
    letter-spacing: 36px;
  }
}
</style>
