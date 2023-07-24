<template>
  <yk-scrollbar height="400px">
    <p v-for="item in 20" :key="item" class="item">{{ item }}</p>
  </yk-scrollbar>
</template>
