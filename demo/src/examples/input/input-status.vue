<template>
  <div class="item">
    <yk-input disabled placeholder="不可用" />
  </div>
  <div class="item">
    <yk-input readonly placeholder="只读" />
  </div>
  <div class="item">
    <yk-input status="danger" placeholder="危险色" />
  </div>
  <div class="item">
    <yk-input status="success" placeholder="成功色" />
  </div>
  <div class="item">
    <yk-input status="warning" placeholder="警告色" />
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
