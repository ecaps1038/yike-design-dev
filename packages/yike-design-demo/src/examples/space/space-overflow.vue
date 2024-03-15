<template>
  <yk-space overflow="auto" class="margin" style="width: 400px">
    <yk-button v-for="item in 10" :key="item" style="margin: 12px 0">
      按钮
    </yk-button>
  </yk-space>
</template>
