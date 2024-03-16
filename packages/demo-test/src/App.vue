<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
// import { YkButton } from '@yike-design/ui'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <yk-space>
    <yk-button>主要按钮</yk-button>
    <yk-button type="secondary">次要按钮</yk-button>
    <yk-button type="outline">线框按钮</yk-button>
    <IconCupOutline />
  </yk-space>
  <yk-input-search>
    <IconCupOutline />
  </yk-input-search>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  padding: 1.5em;
  height: 6em;
  transition: filter 300ms;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
