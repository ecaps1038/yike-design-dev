<template>
  <div class="item">
    <yk-title level="5">搭配文字</yk-title>
    <yk-input placeholder="四">
      <template #prefix>今天是星期</template>
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
    <yk-input placeholder="请输入口令...">
      <template #suffix>
        <yk-button>提交</yk-button>
      </template>
    </yk-input>
  </div>
</template>
