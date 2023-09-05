<script setup lang="ts"></script>

<template>
  <main class="ahome">
    <yk-space>
      <div class="hz a"></div>
      <div class="hz b"></div>
      <div class="hz c"></div>
      <div class="hz d"></div>
    </yk-space>
  </main>
</template>

<style lang="less" scoped>
.ahome {
  padding: 24px;
}

.hz {
  padding: 8px;
  width: 40px;
  height: 40px;
}

.a {
  background-color: @bg-color-l;
}

.b {
  background-color: @bg-color-m;
}

.c {
  background-color: @bg-color-s;
}

.d {
  background-color: @bg-color-ss;
}
</style>
