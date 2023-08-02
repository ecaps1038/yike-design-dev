<template>
  <yk-space direction="vertical">
    <yk-input placeholder="四" style="width: 360px">
      <template #prefix><yk-text>今天是星期</yk-text></template>
    </yk-input>
    <yk-input style="width: 360px">
      <template #prefix><yk-text>衬衫的价格是</yk-text></template>
      <template #suffix><yk-text>便士</yk-text></template>
    </yk-input>
    <yk-input placeholder="输入总金额" style="width: 360px" size="s">
      <template #prefix>
        <IconMoneyOutline />
      </template>
    </yk-input>
    <yk-input placeholder="输入总金额" style="width: 360px" size="m">
      <template #prefix>
        <IconMoneyOutline />
      </template>
    </yk-input>
    <yk-input placeholder="输入总金额" style="width: 360px">
      <template #prefix>
        <IconMoneyOutline />
      </template>
    </yk-input>
    <yk-input placeholder="输入总金额" style="width: 360px" size="xl">
      <template #prefix>
        <IconMoneyOutline />
      </template>
    </yk-input>
    <yk-input placeholder="请输入你最喜欢的书" style="width: 360px">
      <template #suffix>
        <IconBookmarkOutline />
      </template>
    </yk-input>
  </yk-space>
</template>
