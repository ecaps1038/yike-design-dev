<script setup lang="ts">
import { RouterView } from 'vue-router'
import Bar from '@/components/Bar.vue'
import * as barData from '../router/config/bar.json'
//菜单
</script>
<template>
  <div class="module-b">
    <Bar :bar="barData.bar" />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>
<style scoped lang="less">
.main {
  padding: 24px 56px 56px 324px;

  .module {
    max-width: 1200px;
  }
}

.mmain {
  padding: 24px;
}
</style>
