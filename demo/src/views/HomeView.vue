<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goPage = (path: string) => router.push({ path })
</script>

<template>
  <div class="main">
    <!-- Logo -->
    <div class="logo-box">
      <IconLogoBackup5Fill class="bg-logo" />
      <div class="logo">
        <IconYikenameFill class="yike" />
        <IconDesignFill class="design" />
      </div>
      <p class="slogan">包容万物，从源头出发，一切从简</p>
    </div>

    <!-- start -->
    <div class="start-btns">
      <yk-button size="l" @click="goPage('develop')">开始使用</yk-button>
      <yk-button type="secondary" size="l" @click="goPage('design')">
        设计文件
      </yk-button>
    </div>
  </div>

  <div class="footer">
    <IconYike1Outline class="sign" />
    <img src="@/assets/svgs/bg-round.svg" draggable="false" />
  </div>
</template>

<style lang="less" scoped>
.main {
  padding: 128px 40px 0;
  height: 100vh;
  flex-direction: column;
}

.logo-box {
  padding: 42px 0;
  font-size: 32px;
  text-align: center;

  .bg-logo {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: -1;
    width: 380px;
    height: 220px;
    color: @bg-color-m;
    transform: translateX(-50%);
    transition: color @animats;
  }

  .logo {
    display: flex;
    justify-content: center;
    gap: 72px;
    padding: 32px 0;
    transition: all 0.2s;

    .yike,
    .design {
      width: auto;
      height: 58px;
    }
  }

  .slogan {
    font-size: 16px;
    font-weight: 500;
  }
}

.start-btns {
  margin-top: 32px;
  text-align: center;

  button:first-child {
    margin-right: 12px;
  }
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 220px;

  .sign {
    position: absolute;
    bottom: 60px;
    left: 50%;
    width: 52px;
    height: 52px;
    transform: translateX(-50%);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: bottom;
    user-select: none;
  }
}

@media (width <= 768px) {
  .logo-box {
    .bg-logo {
      display: none;
    }

    .logo {
      flex-direction: column;
      gap: 24px;

      .yike,
      .design {
        height: 40px;
      }
    }
  }

  .start-btns {
    margin-top: 0;
  }
}

@media (width <= 600px) {
  .logo-box,
  .start-btns {
    text-align: left;

    .logo {
      align-items: flex-start;
    }
  }
}
</style>
