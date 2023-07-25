<template>
  <div class="item">
    <yk-input show-counter placeholder="请输入..." />
  </div>
  <div class="item">
    <yk-input show-counter limit="5" placeholder="请输入..." />
  </div>
</template>
<style scoped>
.item {
  display: flex;
  margin-bottom: 5px;
  width: 350px;
  flex-direction: column;
}
</style>
