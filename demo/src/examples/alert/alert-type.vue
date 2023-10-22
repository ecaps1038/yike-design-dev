<template>
  <div class="yk-alert-group">
    <yk-alert type="info" message="这里是 info 提示" />
    <yk-alert type="success" message="这里是 success 提示" />
    <yk-alert type="warning" message="这里是 warning 提示" />
    <yk-alert type="error" message="这里是 error 提示" />
  </div>
</template>

<style lang="less">
.yk-alert-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  align-items: flex-start;
}
</style>
