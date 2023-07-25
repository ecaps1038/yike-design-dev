<template>
  <div class="item">
    <yk-input placeholder="四">
      <template #prefix>今天是星期</template>
    </yk-input>
  </div>
  <div class="item">
    <yk-input>
      <template #prefix>衬衫的价格是</template>
      <template #suffix>便士</template>
    </yk-input>
  </div>
  <div class="item">
    <yk-input placeholder="输入链接">
      <template #prefix>
        <yk-icon name="yk-fujian"></yk-icon>
      </template>
    </yk-input>
  </div>
  <div class="item">
    <yk-input placeholder="请输入口令...">
      <template #suffix>
        <yk-icon name="yk-suo" />
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
