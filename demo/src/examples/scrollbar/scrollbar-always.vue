<template>
  <yk-scrollbar height="400px" always>
    <div class="content">
      <p v-for="item in 20" :key="item" class="item">{{ item }}</p>
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
