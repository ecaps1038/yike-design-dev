<template>
  <yk-scrollbar height="400px" always>
    <div>
      <p v-for="item in 20" :key="item" class="item">{{ item }}</p>
    </div>
  </yk-scrollbar>
</template>
