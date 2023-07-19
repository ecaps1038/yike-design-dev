<script setup lang="ts">
defineProps({
  bar: {
    type: Array,
  },
})
</script>

<template>
  <div class="page-content">
    <Bar :bar="bar" />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-content {
  display: flex;
  position: relative;
  width: 1366px;
  margin: 0 auto;
  .main {
    flex: 1;
    margin-left: 320px;
    max-width: 900px;
  }
}
</style>
