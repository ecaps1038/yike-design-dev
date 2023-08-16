<script setup lang="ts">
import Bar from '@/components/Bar.vue'
import barData from '../router/config/bar.json'
//菜单
</script>
<template>
  <div class="module-b">
    <Bar :bar="barData" />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>
<style scoped lang="less">
.main {
  padding: 24px 224px 56px 324px;

  .module {
    max-width: 1200px;
  }
}

.mmain {
  padding: 24px;
}
</style>
