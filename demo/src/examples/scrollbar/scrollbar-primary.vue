<template>
  <yk-scrollbar height="400px">
    <div class="wrapper">
      <p v-for="item in 20" :key="item" class="item">{{ item }}</p>
    </div>
  </yk-scrollbar>
</template>
<style scoped lang="less">
.wrapper {
  width: 1300px;
}
div p {
  width: 100%;
  background: @bg-color-s;
}
</style>
