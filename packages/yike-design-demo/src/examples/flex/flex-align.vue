<template>
  <yk-space dir="vertical" style="width: 100%">
    <yk-flex justify="center" align="center" gap="12" class="demo-row">
      <div v-for="n in 3" :key="n" class="flex-box">居中</div>
    </yk-flex>
    <yk-flex justify="end" gap="12">
      <div v-for="n in 3" :key="n" class="flex-box">靠右</div>
    </yk-flex>
    <yk-flex vertical gap="8">
      <div v-for="n in 3" :key="n" class="flex-box">纵向 {{ n }}</div>
    </yk-flex>
  </yk-space>
</template>

<style scoped>
.demo-row {
  height: 80px;
  border-radius: 6px;
  background: rgb(43 90 237 / 6%);
}

.flex-box {
  padding: 12px 20px;
  border-radius: 6px;
  color: #2b5aed;
  background: rgb(43 90 237 / 12%);
}
</style>
