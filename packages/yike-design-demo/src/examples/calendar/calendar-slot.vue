<template>
  <yk-calendar v-model="currentRef">
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </yk-calendar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const currentRef = ref(new Date())
</script>
