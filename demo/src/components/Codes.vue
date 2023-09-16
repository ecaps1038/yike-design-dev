<script setup lang="ts">
defineProps({
  code: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <highlightjs :autodetect="false" :code="decodeURIComponent(code)" />
</template>
