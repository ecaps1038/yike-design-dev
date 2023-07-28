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
@import url('@/style/code-color.less');

.codes {
  padding-bottom: @space-m;
}

pre {
  overflow: hidden;
  max-width: 1200px;
  border-radius: @radius-m;
  text-align: left;

  code.hljs {
    padding: 20px 30px;
  }
}
</style>
