<template>
  <yk-rate v-model="rate" size="s"></yk-rate>
  <br />
  <yk-rate v-model="rate" size="m"></yk-rate>
  <br />
  <yk-rate v-model="rate" size="l"></yk-rate>
  <br />
  <yk-rate v-model="rate" size="xl"></yk-rate>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const rate = ref(null)
</script>
