<template>
  <yk-time-picker format="hh:mm a" use12-hours :default-value="defaultValue" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const defaultValue = ref('09:24')
</script>
