<template>
  <yk-scrollbar class="container" height="400px">
    <div>
      <p v-for="item in 20" :key="item" class="item">{{ item }}</p>
    </div>
  </yk-scrollbar>
</template>
