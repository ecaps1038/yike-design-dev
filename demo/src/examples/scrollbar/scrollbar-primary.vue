<template>
  <yk-scrollbar height="400px">
    <div class="content">
      <div v-for="item in 20" :key="item" class="item">{{ item }}</div>
    </div>
  </yk-scrollbar>
</template>
<style scoped lang="less">
.content {
  overflow: hidden;
}
.item {
  margin: 10px;
  padding: 10px;
  background: @bg-color-s;
}
</style>
