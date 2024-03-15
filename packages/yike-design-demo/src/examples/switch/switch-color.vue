<template>
  <yk-switch
    v-model="isChecked"
    checked-color="#1fb4a2"
    unchecked-color="#fa5247"
  ></yk-switch>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const isChecked = ref(false)
</script>
