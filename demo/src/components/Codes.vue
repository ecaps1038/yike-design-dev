<template>
  <div class="codes">
    <highlightjs autodetect :code="code" />
  </div>
</template>
<script setup lang="ts">
defineProps({
  code: {
    type: String,
    required: true,
  },
})
</script>
<style scoped lang="less">
.codes {
  padding-bottom: @space-m;
}

pre {
  border-radius: @radius-m;
  overflow: hidden;
  text-align: left;
  max-width: 1000px;

  code.hljs {
    padding: 20px 30px;
  }
}
</style>
