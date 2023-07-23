<template>
  <div class="item">
    <yk-title level="5">搭配文字</yk-title>
    <yk-input placeholder="四">
      <template #prefix>今天是星期</template>
      <template #suffix>，V我50</template>
    </yk-input>
  </div>
  <div class="item">
    <yk-title level="5"></yk-title>
    <yk-input>
      <template #prefix>衬衫的价格是</template>
      <template #suffix>便士</template>
    </yk-input>
  </div>
  <div class="item">
    <yk-title level="5">搭配图标</yk-title>
    <yk-input placeholder="输入链接">
      <template #prefix>
        <yk-icon name="yk-fujian"></yk-icon>
      </template>
    </yk-input>
  </div>
  <div class="item">
    <yk-title level="5">搭配控件</yk-title>
    <yk-input placeholder="百度一下，你也不会。">
      <template #prefix>
        <yk-icon name="yk-sousuo"></yk-icon>
      </template>
      <template #suffix>
        <yk-button>搜索</yk-button>
      </template>
    </yk-input>
  </div>
</template>
<style scoped>
.item {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 5px;
}
.item h5 {
  margin: 0px;
  width: 85px;
}
</style>
