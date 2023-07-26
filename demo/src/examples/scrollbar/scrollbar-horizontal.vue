<template>
  <yk-scrollbar class="container">
    <div style="display: flex">
      <p v-for="item in 20" :key="item" class="item">{{ item }}</p>
    </div>
  </yk-scrollbar>
</template>
<style scoped>
.item {
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 100px;
  height: 50px;
  border-radius: 4px;
  text-align: center;
  flex-shrink: 0;
}
</style>
