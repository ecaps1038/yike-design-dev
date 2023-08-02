<template>
  <yk-space direction="vertical">
    <yk-input-search loading placeholder="正在查找..." style="width: 360px" />
    <yk-input-search style="width: 360px">
      <template #prefix>
        <IconSearchOutline />
      </template>
      <template #suffix>
        <yk-button type="secondary">搜索</yk-button>
      </template>
    </yk-input-search>
    <yk-input-search size="xl" placeholder="搜点什么" style="width: 360px">
      <template #suffix>
        <yk-button size="xl"><IconSearchOutline /></yk-button>
      </template>
    </yk-input-search>
  </yk-space>
</template>
