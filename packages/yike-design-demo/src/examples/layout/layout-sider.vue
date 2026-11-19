<template>
  <yk-layout style="height: 320px">
    <yk-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      theme="dark"
      :width="200"
      :collapsed-width="64"
    >
      <div class="sider-menu">
        <div v-for="item in menus" :key="item" class="sider-menu-item">
          {{ collapsed ? item.slice(0, 1) : item }}
        </div>
      </div>
    </yk-layout-sider>
    <yk-layout>
      <yk-layout-header>Header</yk-layout-header>
      <yk-layout-content>Content</yk-layout-content>
      <yk-layout-footer>Footer</yk-layout-footer>
    </yk-layout>
  </yk-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
const menus = ['首页', '组件', '文档', '关于']
</script>

<style scoped>
.sider-menu-item {
  padding: 8px 12px;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sider-menu-item:hover {
  background: rgb(255 255 255 / 12%);
}
</style>
