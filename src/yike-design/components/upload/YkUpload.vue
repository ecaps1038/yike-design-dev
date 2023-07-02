<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      default: 'file',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  });
</script>
<template>
  <div class="yk-upload"></div>
</template>
<style scoped lang="less"></style>
