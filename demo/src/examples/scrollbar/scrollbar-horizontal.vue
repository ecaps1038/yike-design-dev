<template>
  <yk-scrollbar>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </yk-scrollbar>
</template>
<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 100px;
  height: 50px;
  border-radius: 4px;
  text-align: center;
  color: var(--el-color-danger);
  background: var(--el-color-danger-light-9);
  flex-shrink: 0;
}
</style>
