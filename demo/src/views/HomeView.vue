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
      <div class="name">
        <IconYikenameFill class="yike" />
        <IconDesignFill class="design" />
      </div>
      <p class="slogan">包容万物，从源头出发，一切从简</p>
    </div>
    <yk-space class="start-btns">
      <yk-button size="l" @click="goPage('develop')">开始使用</yk-button>
      <yk-button type="secondary" size="l" @click="goPage('design')">
        设计文件
      </yk-button>
    </yk-space>
    <IconYike1Outline class="sign" @click="goPage('hh')" />
    <div class="bg-img">
      <p class="round size-1000"></p>
      <p class="round size-800"></p>
      <p class="round size-1600"></p>
      <p class="round size-600"></p>
      <p class="round size-760"></p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  height: 100vh;
  flex-direction: column;

  .sign {
    position: absolute;
    bottom: 60px;
    width: 56px;
    height: 56px;
  }
}

.size(@name,@top,@left,@right) {
  .size-@{name} {
    top: ~'@{top}px';
    right: @right;
    left: @left;
    width: ~'@{name}px';
    height: ~'@{name}px';
  }
}

.bg-img {
  position: absolute;
  bottom: 200px;
  z-index: -1;
  width: 100%;
  // height: 200px;
  background: #eee;

  .round {
    position: absolute;
    border-radius: 50%;
    background-image: linear-gradient(
      144deg,
      rgb(99 133 237 / 0%) 0%,
      rgb(61 104 235 / 30%) 100%
    );
  }
  .size(1000,44,-400px,0);
  .size(800,75,-40px,0);
  .size(1600,0,0,0);
  .size(600,110,auto,260px);
  .size(760,42,auto,-200px);

  .size-1600 {
    margin: 0 auto;
  }
}

.start-btns {
  padding-top: 40px;
}

.logo {
  position: relative;
  margin-top: -160px;
  height: 220px;

  .bg-logo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
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

  .name {
    padding: 48px 0 32px;
  }

  .yike {
    margin: 0;
    // padding: 42px 0 16px 20px;
    width: auto;
    height: 60px;
  }

  .design {
    margin-left: 88px;
    width: auto;
    height: 60px;
  }
}

/* stylelint-disable-next-line media-feature-range-notation */
@media (max-width: 810px) {
  .logo {
    padding: 0 40px;

    .bg-logo {
      display: none;
    }

    .name {
      padding: 32px 0;
    }

    .slogan {
      text-align: left;
    }

    .yike {
      margin: 0;
      width: auto;
      height: 40px;
    }

    .design {
      margin: 36px 0 0;
      width: auto;
      height: 40px;
    }

    .mobile-title {
      display: block;

      .title {
        padding: unset;
        text-align: left;
        letter-spacing: 8px;
      }
    }
  }

  .start-btns {
    padding-left: 40px;
    width: 100%;
  }
}
</style>
