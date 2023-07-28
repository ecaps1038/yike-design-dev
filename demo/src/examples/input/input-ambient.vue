<template>
  <div class="item">
    <yk-input placeholder="请输入...">
      <template #prepend>
        <yk-button>提交</yk-button>
      </template>
    </yk-input>
  </div>
  <div class="item">
    <yk-input placeholder="请输入...">
      <template #append>
        <yk-button>提交</yk-button>
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
