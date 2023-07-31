<template>
  <div class="item">
    <yk-input-search loading placeholder="正在查找..." />
  </div>
  <div class="item">
    <yk-input-search>
      <template #prefix>
        <IconSearchOutline />
      </template>
      <template #suffix>
        <yk-button type="secondary">搜索</yk-button>
      </template>
    </yk-input-search>
  </div>
  <div class="item">
    <yk-input-search size="xl" placeholder="搜点什么">
      <template #suffix>
        <yk-button size="xl"><IconSearchOutline /></yk-button>
      </template>
    </yk-input-search>
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
