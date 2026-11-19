<template>
  <yk-space dir="vertical" style="width: 100%">
    <span>调整浏览器宽度查看效果：</span>
    <yk-row :gutter="[16, 16]">
      <yk-col v-for="n in 4" :key="n" :xs="24" :sm="12" :md="8" :lg="6">
        <div class="grid-box">响应式栅格</div>
      </yk-col>
    </yk-row>
  </yk-space>
</template>

<style scoped>
.grid-box {
  padding: 16px 0;
  border-radius: 6px;
  text-align: center;
  color: #2b5aed;
  background: rgb(43 90 237 / 12%);
}
</style>
