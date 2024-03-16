<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goPage = (path: string) => router.push({ path })
</script>

<template>
  <div class="main">
    <!-- 404 -->
    <div class="not-found">
      <h1 class="slogan">当前页面不存在</h1>
    </div>

    <!-- back to home -->
    <yk-button size="l" @click="goPage('/')">回到主页</yk-button>
  </div>

  <div class="footer">
    <IconYike1Outline class="sign" />
    <img src="@/assets/svgs/bg-round.svg" draggable="false" />
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 40px;
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
</style>
