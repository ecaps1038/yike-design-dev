<template>
  <yk-space dir="vertical" style="width: 100%">
    <yk-flex gap="8">
      <div v-for="n in 3" :key="n" class="flex-box">Item {{ n }}</div>
    </yk-flex>
    <yk-flex justify="space-between">
      <div v-for="n in 3" :key="n" class="flex-box">Item {{ n }}</div>
    </yk-flex>
    <yk-flex gap="16" wrap>
      <div v-for="n in 6" :key="n" class="flex-box">wrap {{ n }}</div>
    </yk-flex>
  </yk-space>
</template>

<style scoped>
.flex-box {
  padding: 12px 20px;
  border-radius: 6px;
  color: #2b5aed;
  background: rgb(43 90 237 / 12%);
}
</style>
