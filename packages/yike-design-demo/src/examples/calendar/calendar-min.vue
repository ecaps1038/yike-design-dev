<template>
  <yk-calendar-min v-model="currentRef"></yk-calendar-min>
</template>
<script setup lang="ts">
import { YkCalendarMin } from '@yike-design/ui/index'
import { ref } from 'vue'
const currentRef = ref(new Date())
</script>
