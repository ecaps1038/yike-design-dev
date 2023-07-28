<template>
  <yk-scrollbar height="400px">
    <div>
      <p v-for="item in 20" :key="item" class="item">{{ item }}</p>
    </div>
  </yk-scrollbar>
</template>
<style scoped lang="less">
div {
  width: 100%;
}
div p {
  width: 100%;
  background: @bg-color-s;
}
</style>
