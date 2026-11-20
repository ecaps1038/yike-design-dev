<template>
  <div class="grid-demo">
    <yk-row :gutter="[16, 16]">
      <yk-col v-for="n in 4" :key="n" :span="6">
        <div class="grid-box">gutter 16</div>
      </yk-col>
    </yk-row>
    <yk-row :gutter="24">
      <yk-col :span="8"><div class="grid-box">gutter 24</div></yk-col>
      <yk-col :span="8"><div class="grid-box">gutter 24</div></yk-col>
      <yk-col :span="8"><div class="grid-box">gutter 24</div></yk-col>
    </yk-row>
    <yk-row :gutter="16">
      <yk-col :span="8"><div class="grid-box">A</div></yk-col>
      <yk-col :span="8" :offset="8">
        <div class="grid-box">offset 8</div>
      </yk-col>
    </yk-row>
    <yk-row justify="center">
      <yk-col :span="6"><div class="grid-box">居中</div></yk-col>
    </yk-row>
  </div>
</template>

<style scoped>
.grid-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.grid-box {
  padding: 16px 0;
  border-radius: 6px;
  text-align: center;
  color: #2b5aed;
  background: rgb(43 90 237 / 12%);
}
</style>
