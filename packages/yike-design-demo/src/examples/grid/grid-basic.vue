<template>
  <div class="grid-demo">
    <yk-row :gutter="16">
      <yk-col :span="24"><div class="grid-box">span 24</div></yk-col>
    </yk-row>
    <yk-row :gutter="16">
      <yk-col :span="12"><div class="grid-box">span 12</div></yk-col>
      <yk-col :span="12"><div class="grid-box">span 12</div></yk-col>
    </yk-row>
    <yk-row :gutter="16">
      <yk-col v-for="n in 3" :key="n" :span="8">
        <div class="grid-box">span 8</div>
      </yk-col>
    </yk-row>
    <yk-row :gutter="16">
      <yk-col v-for="n in 4" :key="n" :span="6">
        <div class="grid-box">span 6</div>
      </yk-col>
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
