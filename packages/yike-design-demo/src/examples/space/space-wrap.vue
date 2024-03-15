<template>
  <p>反转换行：</p>
  <yk-space wrap="reverse" :size="[10, 20]" class="margin" style="width: 300px">
    <yk-button v-for="item in 10" :key="item">按钮</yk-button>
  </yk-space>
</template>
