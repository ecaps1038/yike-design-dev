<template>
  <div class="item">
    <yk-input placeholder="四">
      <template #prefix><yk-text>今天是星期</yk-text></template>
    </yk-input>
  </div>
  <div class="item">
    <yk-input>
      <template #prefix><yk-text>衬衫的价格是</yk-text></template>
      <template #suffix><yk-text>便士</yk-text></template>
    </yk-input>
  </div>
  <div class="item">
    <yk-input placeholder="输入总金额">
      <template #prefix>
        <IconMoneyOutline />
      </template>
    </yk-input>
  </div>
  <div class="item">
    <yk-input placeholder="请输入你最喜欢的书">
      <template #suffix>
        <IconBookmarkOutline />
      </template>
    </yk-input>
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
