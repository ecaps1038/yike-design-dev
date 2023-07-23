<template>
  <div class="item">
    <yk-title level="5">不可用</yk-title>
    <yk-input disabled placeholder="不可用" />
  </div>
  <div class="item">
    <yk-title level="5">危险色</yk-title>
    <yk-input status="danger" placeholder="危险色" />
  </div>
  <div class="item">
    <yk-title level="5">成功色</yk-title>
    <yk-input status="success" placeholder="成功色" />
  </div>
  <div class="item">
    <yk-title level="5">警告色</yk-title>
    <yk-input status="warning" placeholder="警告色" />
  </div>
</template>
<style scoped>
.item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.item h5 {
  margin: 0px;
  width: 65px;
}
</style>
